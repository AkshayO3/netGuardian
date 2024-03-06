import "./globals.css";
import Nav from "./components/Nav";

export const metadata = {
  title: "Net Guardian",
  description: "Generate fast report for  your configuration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
