interface Game {
    id: string;
    whitePlayerName: string;
    blackPlayetName: string;
    moves: string[];
}

export const games: Game[] = []