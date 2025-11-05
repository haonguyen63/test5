"use client";
import { useState } from "react";
import RequireAuth from "../../_components/RequireAuth";
import { getAuth } from "../../_lib/auth-client";

export default function ExportPage() {
  return (
    <RequireAuth allowRoles={["manager","admin"]}>
      <Content />
    </RequireAuth>
  );
}

function Content() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("all");
  const auth = getAuth();

  async function onDownload() {
    const qs = new URLSearchParams({ from, to, phone, type }).toString();
    const res = await fetch(`/api/export/transactions?${qs}`, {
      headers: { Authorization: `Bearer ${auth?.token}` }
    });
    if (!res.ok) { alert("Không thể tạo CSV"); return; }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "transactions.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  async function onExportCustomers() {
    const res = await fetch(`/api/export/customers`, {
      headers: { Authorization: `Bearer ${auth?.token}` }
    });
    if (!res.ok) { alert("Không thể xuất khách hàng"); return; }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "customers.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-3xl mx-auto bg-neutral-900 p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Xuất CSV</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div><label className="block text-sm mb-1">Từ ngày</label>
          <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="w-full bg-neutral-800 p-2 rounded"/></div>
        <div><label className="block text-sm mb-1">Đến ngày</label>
          <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="w-full bg-neutral-800 p-2 rounded"/></div>
        <div><label className="block text-sm mb-1">SĐT khách hàng</label>
          <input placeholder="090..." value={phone} onChange={e=>setPhone(e.target.value)} className="w-full bg-neutral-800 p-2 rounded"/></div>
        <div><label className="block text-sm mb-1">Loại giao dịch</label>
          <select value={type} onChange={e=>setType(e.target.value)} className="w-full bg-neutral-800 p-2 rounded">
            <option value="all">Tất cả</option>
            <option value="earn">Tích điểm</option>
            <option value="redeem">Đổi điểm</option>
          </select></div>
      </div>
      <div className="flex gap-3">
        <button onClick={onDownload} className="px-4 py-2 rounded bg-blue-600">Tải transactions.csv</button>
        <button onClick={onExportCustomers} className="px-4 py-2 rounded bg-blue-600">Tải customers.csv</button>
      </div>
    </div>
  );
}