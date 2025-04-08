/**
 * @author Carson Fujita
 * @copyright Carson FUjita, 2025
 */
import Image from "next/image";
import styles from "./page.module.css";
import Navigation from "./components/Navbar/navbar";
export default function Home() {
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
