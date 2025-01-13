import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Users from './components/Users'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Vendors from './components/Vendors'
import Requests from './components/Requests'
import Complaints from './components/Complaints'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
      <div className="flex h-screen bg-lightPrimary dark:!bg-navy-900">
        <Sidebar />
        
        <div className="flex-1 overflow-auto">
        <Navbar/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/vendor-requests" element={<Requests />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
