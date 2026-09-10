export { auth as default } from "@/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/professional/setup/:path*",
    "/settings/:path*",
  ],
};
