import { Metadata } from "next";
import BreadCrumbs from "../components/organisme/BreadCrumbs";
import Sidebar from "../components/utilities/sidebar/Sidebar";

export const metadata: Metadata = {
    title: "PecPeng - Pencatatan Pengeluaran",
    description: "Web untuk mencatat pengeluaran dan pemasukan anda.",
    icons: "/logo.png",
    verification: {
        google: "7UVWLjtHfAA1ccchiarJNOFElAmh6e2a4nHTqbosAZU"
    },
    keywords: [
        'Catat Pemasukkan', 'Catat Pengeluaran', 'PecPeng', 'Backend', 'React', 'Next.js', 'Laravel', 'Node.js', 'Prisma', 'PostgreSQL', 'MySQL', 'JavaScript', 'TypeScript', 'API Development', 'Database Management', 'Version Control', 'GitHub', 'User Authentication', 'JWT'
    ],
    openGraph: {
        title: 'PecPeng - Pencatatan Pengeluaran',
        description: 'Web untuk mencatat pengeluaran dan pemasukan anda.',
        url: 'https://catatan-pengeluaran-three.vercel.app/',
        siteName: 'PecPeng - Pencatatan Pengeluaran',
        images: ['https://catatan-pengeluaran-three.vercel.app/logo.png'],
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            "max-snippet": -1
        },
    },
    authors: [{
        name: 'Pito Desri Pauzi', url: 'https://github.com/PitokDf'
    }],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <BreadCrumbs />
                {children}
            </div>
        </>
    );
}