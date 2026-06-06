import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

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
      if (account) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
          const res = await fetch(`${apiUrl}/auth/sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: token.email, name: token.name }),
          });
          if (res.ok) {
            const data = await res.json();
            token.backendToken = data.token;

            const profileRes = await fetch(`${apiUrl}/users/me`, {
              headers: { Authorization: `Bearer ${data.token}` },
            });
            if (profileRes.ok) {
              const profile = await profileRes.json();
              token.role = profile.role;
            }
          }
        } catch {
          // Backend unavailable — backendToken and role will be absent
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
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  debug: process.env.NODE_ENV === "development",
});
