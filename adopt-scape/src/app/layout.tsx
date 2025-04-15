import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navbar/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer/Footer";

export const metadata: Metadata = {
  title: "AdoptScape",
  description: "find animals to adopt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/**Bootstrap */}
        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"/>
        <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"/>
        <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"/>
      </head>
      <body>
        {children}
        <Footer /> 
        <script>var Alert = ReactBootstrap.Alert;</script>
      </body>
    </html>
  );
}

