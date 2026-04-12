import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminClient from "@/components/AdminClient";

export default async function AdminPage() {
  const cookieStore = await cookies(); // ✅ FIX
  const admin = cookieStore.get("admin");

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminClient />;
}