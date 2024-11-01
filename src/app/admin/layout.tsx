import AdminNavBar from '@/app/admin/components/Navbar';
import { Providers } from "@/providers"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Providers>
                <AdminNavBar />
                {children}
            </Providers>
        </div>
    )
}