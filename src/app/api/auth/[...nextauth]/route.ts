// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 // Validasi user
//                 const user = {
//                     userID: "6681a993-6869-49a1-88a9-6b44cfe29cca",
//                     name: "pitok",
//                     email: "pitok@gmail.com",
//                     password: "1234",
//                 };

//                 if (user && user.password === credentials?.password) {
//                     return { id: user.userID, name: user.name, email: user.email };
//                 }

//                 return null;
//             },
//         }),
//     ],
//     callbacks: {
//         async session({ session, token }) {
//             session.user.id = token.userID;
//             return session;
//         },
//         async jwt({ token, user }) {
//             if (user) {
//                 token.userID = user.id;
//             }
//             return token;
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "/auth/login",
//     },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
import NextAuth from "next-auth"
import { authOptions } from "./config"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

