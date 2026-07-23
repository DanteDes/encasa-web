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

        const DEMO_USERS = [
          { id: "1", email: "demo@encasa.com", password: "demo1234", name: "Demo Usuario", role: "client" },
          { id: "2", email: "admin@encasa.com", password: "admin1234", name: "Admin EnCasa", role: "professional" },
        ];

        const user = DEMO_USERS.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
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
    async jwt({ token, account }) {
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
