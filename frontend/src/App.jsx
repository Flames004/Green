import {  Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import AdminLogin from './pages/AdminLogin'
import AdminRoutes from './components/AdminRoutes'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'


const App = () => {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000}/>
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
      <Route path='/admin/login' element={<AdminLogin/>}/>

       <Route 
          path="/admin" 
          element={
            <AdminRoutes>
              <AdminLayout />
            </AdminRoutes>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
    </Routes>
    </>
  )
}

export default App