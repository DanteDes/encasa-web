import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const FIVE_MINUTES = 5 * 60 * 1000;

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

        // TODO: reemplazar por llamada real al backend cuando esté disponible
        // const res = await fetch(`${apiUrl}/auth/login`, { method: "POST", body: JSON.stringify({ email, password }) });
        // if (!res.ok) return null;
        // return res.json();

        // TODO: reemplazar por validación real contra la base de datos
        // const res = await fetch(`${apiUrl}/auth/login`, { method: "POST", body: JSON.stringify({ email, password }) });
        // if (!res.ok) return null;
        // return res.json();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || password.length < 6) return null;

        // Cuenta de demo para el rol profesional
        if (email === "profesional@encasa.com" && password === "prof1234") {
          return { id: "demo-prof", email, name: "Demo Profesional", role: "professional" };
        }

        // Cualquier otro email/password válido → cliente
        const name = email.split("@")[0].replace(/[._-]/g, " ");
        return {
          id: email,
          email,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          role: "client",
        };
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
      // Persist role from Credentials authorize into the token
      if (user?.role) token.role = user.role;
      const apiUrl =
        process.env.BACKEND_URL ??
        process.env.NEXT_PUBLIC_API_URL ??
        "http://localhost:8080";
      const now = Date.now();

      if (account) {
        // First sign-in: sync user to backend
        try {
          const res = await fetch(`${apiUrl}/auth/sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: token.email,
              name: token.name,
              image: token.picture,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            token.backendToken = data.token;
            token.roleRefreshedAt = now;
          }
        } catch {
          // Backend unavailable on sign-in
        }
      }

      // Refresh role from backend every 5 minutes so role changes
      // (e.g. user creates professional profile) reflect without re-login
      const needsRefresh =
        token.backendToken &&
        (!token.roleRefreshedAt ||
          now - (token.roleRefreshedAt as number) > FIVE_MINUTES);

      if (needsRefresh) {
        try {
          const profileRes = await fetch(`${apiUrl}/users/me`, {
            headers: { Authorization: `Bearer ${token.backendToken}` },
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
        if (token.backendToken) session.user.backendToken = token.backendToken;
        if (token.role) session.user.role = token.role;
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
