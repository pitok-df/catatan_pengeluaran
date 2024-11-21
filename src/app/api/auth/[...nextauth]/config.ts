import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "../../config";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
        ,
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
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    callbacks: {
        async session({ session, token, user }: any) {
            // Attach user ID from token to session object
            if (token) {
                session.user.id = token.id as string;
                session.token = user
            }
            return session;
        },
        async jwt({ token, user, account, profile }) {

            if (user) {
                token.id = user.id;
            }

            if (profile && account) {
                const newUser = await prisma.users.upsert({
                    where: { email: profile.email },
                    update: {},
                    create: {
                        email: profile.email!,
                        name: profile.name! || "Guest",
                        password: `${profile.name?.split(" ").join("_")}_${profile.email}_google`
                    }
                });
                token.id = newUser.userID;
            }
            if (account) {
                token.access_token = account.access_token
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + "/dashboard"
        }
    },
    secret: process.env.AUTH_SECRET,
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: "/"
            }
        }
    },
    pages: {
        signIn: "/auth/login"
    },
};
