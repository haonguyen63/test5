"use client";
import { useEffect, useState } from "react";
import RequireAuth from "../../_components/RequireAuth";
import { getAuth } from "../../_lib/auth-client";

export default function UsersPage() {
  return (
    <RequireAuth allowRoles="admin">
      <UsersContent />
    </RequireAuth>
  );
}

function UsersContent() {
  const auth = getAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/users", {
      headers: { Authorization: `Bearer ${auth?.token}` }
    });
    const data = await res.json();
    setList(data.users || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);
  function pick(u) { setEditing({ ...u }); }

  async function saveEdit() {
    const payload = {
      name: editing.name,
      phone: editing.phone,
      username: editing.username,
      role: editing.role,
      autoLogoutMinutes: editing.autoLogoutMinutes ? Number(editing.autoLogoutMinutes) : null
    };
    const res = await fetch(`/api/users/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth?.token}` },
      body: JSON.stringify(payload)
    });
    if (!res.ok) { alert("Lưu thất bại"); return; }
    setEditing(null); load();
  }

  async function remove(id) {
    if (!confirm("Xoá user này?")) return;
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${auth?.token}` }
    });
    if (!res.ok) { alert("Xoá thất bại"); return; }
    load();
  }

  if (loading) return null;

  return (
    <div className="max-w-4xl mx-auto bg-neutral-900 p-6 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Quản trị người dùng</h2>
      <ul className="space-y-2 mb-6">
        {list.map(u => (
          <li key={u.id} className="flex items-center justify-between bg-neutral-800 p-3 rounded cursor-pointer"
              onClick={() => pick(u)}>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs rounded bg-neutral-700">{u.role}</span>
              <span>{u.name} — {u.username || u.phone}</span>
            </div>
            <button className="text-red-300" onClick={(e)=>{e.stopPropagation(); remove(u.id);}}>Xoá</button>
          </li>
        ))}
      </ul>

      {editing && (
        <div className="bg-neutral-800 p-4 rounded">
          <h3 className="font-semibold mb-3">Sửa user</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input className="bg-neutral-700 p-2 rounded" placeholder="Họ tên"
                   value={editing.name||""} onChange={e=>setEditing(v=>({...v,name:e.target.value}))}/>
            <input className="bg-neutral-700 p-2 rounded" placeholder="SĐT"
                   value={editing.phone||""} onChange={e=>setEditing(v=>({...v,phone:e.target.value}))}/>
            <input className="bg-neutral-700 p-2 rounded" placeholder="Username"
                   value={editing.username||""} onChange={e=>setEditing(v=>({...v,username:e.target.value}))}/>
            <select className="bg-neutral-700 p-2 rounded" value={editing.role}
                    onChange={e=>setEditing(v=>({...v,role:e.target.value}))}>
              <option value="staff">Nhân viên</option>
              <option value="manager">Quản lý</option>
              <option value="admin">Admin</option>
            </select>
            <input className="bg-neutral-700 p-2 rounded" type="number" min="0"
                   placeholder="Auto logout (phút). 0 = tắt"
                   value={editing.autoLogoutMinutes ?? ""}
                   onChange={e=>setEditing(v=>({...v, autoLogoutMinutes: e.target.value}))}/>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 rounded bg-blue-600" onClick={saveEdit}>Lưu</button>
            <button className="px-4 py-2 rounded bg-neutral-600" onClick={()=>setEditing(null)}>Huỷ</button>
          </div>
        </div>
      )}
    </div>
  );
}