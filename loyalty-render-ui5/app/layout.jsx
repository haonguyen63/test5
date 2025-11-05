export const metadata = { title: 'Điểm tích lũy', description: 'UI cho Render.com' };
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <AutoLogout />
        <div className="container">
          <div className="header">
            <h1>Điểm tích lũy</h1>
            <div className="nav">
              <a href="/login">Đăng nhập</a>
              <a href="/pos">Bán hàng</a>
              <a href="/manager/export">Xuất CSV</a>
              <a href="/admin/users">Quản trị</a>
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
