import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../config";
import bcrypt from "bcrypt";
"bcrypt";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and Password are required!");
                }

                // Find user in the database
                const findUser = await prisma.users.findUnique({
                    where: { email: credentials.email },
                });

                if (!findUser) {
                    throw new Error("Invalid email or password");
                }

                const passwordValid = await bcrypt.compare(credentials.password, findUser.password);

                if (!passwordValid) {
                    throw new Error("Invalid credentials")
                }
                // Return user data to save in JWT
                const user = {
                    id: String(findUser.userID),
                    name: findUser.name,
                    email: findUser.email,
                };

                return user;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }: any) {
            // Attach user ID from token to session object
            if (token) {
                session.user.id = token.id as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/login"
    },
};
