import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className='header'>
        <NavLink to="/" className='w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md'>
            <p className='blue-gradient_text'>AR</p>
        </NavLink>
        <nav className='flex text-lg gap-7 text-white font-medium'>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-400'} >
                About
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-400'} >
                Projects
            </NavLink>
        </nav>
    </header>
  )
}

