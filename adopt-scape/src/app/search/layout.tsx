/**
 * @author Carson Fujita
 * @copyright Carson Fujita, 2025
 */
import Navigation from "../components/Navbar/navbar";
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Navigation>
          <>Search</>
        </Navigation>
      </header>
      <main>{children}</main>
    </>
  );
}