export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/professional/setup/:path*",
    "/settings/:path*",
  ],
};






