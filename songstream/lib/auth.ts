import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const SCOPES = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-currently-playing",
].join(" "); 

export const NEXT_AUTH = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          response_type: "code",
          scope: SCOPES,
        },
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }:any) {
        if (account) {
          token.accessToken = account.access_token || "";
          token.refreshToken = account.refresh_token || "";
          token.expiresAt = Date.now() + (account.expires_at || 3600) * 1000 ;
        }
  
        // Handle token expiry
        if (Date.now() < Number(token.expiresAt)) {
          return token;
        }
  
        // Refresh token when expired
        return await refreshSpotifyToken(token);
      },
  
      async session({ session, token }:any) {
        // Attach tokens to the session object
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        return session;
      },
  }
};

async function refreshSpotifyToken(token:any) {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: token.refreshToken,
        }),
      });
  
      const refreshedTokens = await response.json();
  
      if (!response.ok) throw refreshedTokens;
  
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
      };
    } catch (error) {
      console.error("Error refreshing Spotify token:", error);
      return { ...token, error: "RefreshTokenError" };
    }
}