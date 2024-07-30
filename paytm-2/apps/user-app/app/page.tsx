import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-2xl">Hi there</h1>
    </div>
  );
}
