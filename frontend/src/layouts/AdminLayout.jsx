import { Sidebar } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
        <Sidebar/>
        <Outlet/>
    </>
  )
}

export default AdminLayout;