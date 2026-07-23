import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const FIVE_MINUTES = 5 * 60 * 1000;
const API_URL = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        if (!email || !password) return null;

        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            signal: AbortSignal.timeout(3000),
          });

          if (!res.ok) return null;

          const data = await res.json();
          // data: { token, id, email, name, role }
          return {
            id: String(data.id),
            email: data.email,
            name: data.name,
            role: data.role,
            backendToken: data.token,
          };
        } catch {
          // Fallback demo cuando el backend no está disponible
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email) || password.length < 6) return null;

          if (email === "profesional@encasa.com" && password === "prof1234") {
            return { id: "demo-prof", email, name: "Demo Profesional", role: "professional" };
          }

          const name = email.split("@")[0].replace(/[._-]/g, " ");
          return {
            id: email,
            email,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            role: "client",
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile?.email_verified === true;
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (user?.role) token.role = user.role;
      if (user?.backendToken) token.backendToken = user.backendToken;

      const now = Date.now();

      // For Google OAuth (first sign-in): sync with backend
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${API_URL}/auth/sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: token.email,
              name: token.name,
              image: token.picture,
            }),
            signal: AbortSignal.timeout(3000),
          });
          if (res.ok) {
            const data = await res.json();
            token.backendToken = data.token;
            token.role = data.role;
            token.roleRefreshedAt = now;
          }
        } catch {
          // Backend unavailable
        }
      }

      // Refresh role every 5 minutes
      const needsRefresh =
        token.backendToken &&
        (!token.roleRefreshedAt ||
          now - (token.roleRefreshedAt as number) > FIVE_MINUTES);

      if (needsRefresh) {
        try {
          const profileRes = await fetch(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token.backendToken}` },
            signal: AbortSignal.timeout(3000),
          });
          if (profileRes.ok) {
            const profile = await profileRes.json();
            token.role = profile.role;
            token.roleRefreshedAt = now;
          }
        } catch {
          // Backend unavailable for role refresh
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        if (token.backendToken) session.user.backendToken = token.backendToken as string;
        if (token.role) session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
});
