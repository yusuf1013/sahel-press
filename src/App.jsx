import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Books from './pages/Books'
import BookDetail from './pages/BookDetail'
import About from './pages/About'
import Submit from './pages/Submit'
import Remember from './pages/Remember'
import News from './pages/News'
import PostDetail from './pages/PostDetail'

import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminBooks from './pages/admin/Books'
import Submissions from './pages/admin/Submissions'
import Newsletter from './pages/admin/Newsletter'
import AdminPosts from './pages/admin/Posts'

function Layout() {
  const { user } = useAuth()
  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/remember" element={<Remember />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<PostDetail />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/books" element={<ProtectedRoute><AdminBooks /></ProtectedRoute>} />
        <Route path="/admin/submissions" element={<ProtectedRoute><Submissions /></ProtectedRoute>} />
        <Route path="/admin/newsletter" element={<ProtectedRoute><Newsletter /></ProtectedRoute>} />
        <Route path="/admin/posts" element={<ProtectedRoute><AdminPosts /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  )
}