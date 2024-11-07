import AdminNavBar from '@/app/admin/components/Navbar';
import { Providers } from "@/providers"
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { getSession } from '@auth0/nextjs-auth0';
import LogInNavBar from './components/LogInNavBar';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getSession();
    const user = session?.user;

    console.log(user);

    if (!user) {
        return <LogInNavBar />
    }

    return (
        <UserProvider>
            <Providers>
                <AdminNavBar />
                {children}
            </Providers>
        </UserProvider>
    )
}