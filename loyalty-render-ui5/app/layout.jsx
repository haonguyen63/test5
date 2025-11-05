import "./globals.css";
import AutoLogout from "./_components/AutoLogout";

export const metadata = {
  title: "App",
  description: "Layout with AutoLogout injected",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <AutoLogout />
        {children}
      </body>
    </html>
  );
}