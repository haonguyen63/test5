# Loyalty UI for Render.com
Next.js UI (App Router) gọi API ngoài qua biến môi trường `NEXT_PUBLIC_API_BASE`.
- /login: chỉ 2 trường username/password (username có thể nhập số ĐT)
- Phân quyền sau login: staff → chỉ /pos; manager → /pos + /manager/export + /admin/users (tạo staff); admin → /pos + /manager/export + /admin/users (tạo staff & manager).

## Deploy trên Render
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment:
  - `NEXT_PUBLIC_API_BASE` = https://<api-service>.onrender.com/api

Nếu gặp lỗi HTML thay vì JSON, kiểm tra `NEXT_PUBLIC_API_BASE` và xem Network tab → Request URL phải trỏ về domain API, content-type: application/json.
