import "./globals.css";

export const metadata = {
  title: "Terminal Portfolio",
  description: "A terminal-themed interactive developer portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
