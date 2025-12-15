"use client";

import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SignOutButton({
  children,
  className = "",
}: SignOutButtonProps) {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className={className}>
      {children || "Cerrar Sesión"}
    </button>
  );
}

