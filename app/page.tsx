import Link from "next/link";
import Image from "next/image";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to My Product Jam Project 🚀</h1>

      <div className={styles.logoContainer}>
        <Image
          src="/huji.svg"
          alt="HUJI Logo"
          width={80}
          height={80}
          priority
        />
        <Image
          src="/bezalel.svg"
          alt="Bezalel Logo"
          width={80}
          height={80}
          priority
        />
      </div>

      <p className={styles.subtitle}>
        Explore the projects below:
      </p>

      <div className={styles.links}>
        <Link href="/tic-tac-toe" className={styles.card}>
          Tic Tac Toe Game
        </Link>

        <Link href="/nasa" className={styles.card}>
          NASA Space Images
        </Link>

        <Link href="/design" className={styles.card}>
          Design
        </Link>

      </div>
    </main>
  );
}
