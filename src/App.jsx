import React from 'react'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Details from './components/Details'
import Create from './components/Create'
import Edit from './components/Edit'

const App = () => {
  const { search, pathname } = useLocation();

  return (
    <div className='h-screen w-screen flex'>
      {(pathname !== '/' || search) && (
        <Link
          to="/"
          className="text-red-300 absolute top-5 left-4 md:left-[17%] font-semibold"
        >
          Home
        </Link>
      )}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/category/:categoryName' element={<Home />} />
        <Route path='*' element={<div className="text-center w-full mt-10">404 - Page Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
