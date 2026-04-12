import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("admin", "", {
    httpOnly: true,
    expires: new Date(0), // delete cookie
    path: "/",
  });

  return response;
}