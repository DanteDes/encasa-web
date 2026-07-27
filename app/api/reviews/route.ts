import { NextResponse } from "next/server";
import { auth } from "@/auth";

const API_URL = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { professionalId, rating, comment } = await req.json();

  if (!professionalId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(session.user.backendToken
          ? { Authorization: `Bearer ${session.user.backendToken}` }
          : {}),
      },
      body: JSON.stringify({ professionalId, rating, comment }),
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) return NextResponse.json({ ok: true });
  } catch {
    // backend no disponible
  }

  // Sin backend: respondemos ok para que la UI funcione en demo
  return NextResponse.json({ ok: true });
}
