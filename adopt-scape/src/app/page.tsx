"use client";
/**
 * @author Carson Fujita
 * @copyright Carson FUjita, 2025
 */
import Image from "next/image";
import styles from "./page.module.css";
import Navigation from "./components/Navbar/navbar";
import Increment from "./components/Increment/increment";
import { useEffect, useState } from "react";

export enum Theme {
  Light,
  Dark
}

export default function Home() {
  const [value, setValue] = useState(4)

  return (
    <>
        <header>
            <Navigation />
        </header>
        <main>
          <p>
            test
          </p>         
        </main>
    </>
  );
}
