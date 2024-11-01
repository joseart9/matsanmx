import { redirect } from 'next/navigation'

export default function AdminHome() {
    redirect('/admin/pedidos')
    return (
        <div>
            <h1>Admin Home</h1>
        </div>
    )
}