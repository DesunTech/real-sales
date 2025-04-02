import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Colorlogonobackground from "../../../../public/assets/images/RealSales-official-logo/For Web/png/Color logo - no background.png"
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import BookAdemo from '../../../common/bookAdemo';
// "/assets/images/RealSales-official-logo/Color logo - no background.png"

const Header = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

  return (
    <header className="main-header sticky top-0 z-50 bg-[#060606] h-[70px]">
      <div className="page-container mx-auto px-4 container">
        <nav className="main-nav flex justify-between items-center py-4">
          <Link href="/" className="logo">
            <Image
              src={Colorlogonobackground}
              alt="RealSales Logo" 
              width={150} 
              height={50} 
              priority 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="header-links hidden md:block">
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-white leading-1 underline">Home</Link></li>
              <li><Link href="/about" className="text-white leading-1 underline">About</Link></li>
              <li className="relative group">
                <Link href="#" className="text-white leading-1 underline">Industries</Link>
                <div className="hidden group-hover:block absolute bg-white shadow-lg">
                  <ul>
                    <li><Link href="/industries/food-beverages" className="block px-4 py-2 hover:bg-gray-100">Food & Beverages</Link></li>
                  </ul>
                </div>
              </li>
              <li><Link href="/faq" className="text-white leading-1 underline">FAQ</Link></li>
            </ul>
          </div>

          {/* Call to Action Buttons */}
          <div className="header-btn hidden md:flex items-center space-x-4">
            <BookAdemo icon={<AddIcCallIcon style={{fontSize: "16px"}}/>}/>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-toggle md:hidden" onClick={toggleMobileMenu}>
            <span className="menu-bar block w-6 h-0.5 bg-white my-1"></span>
            <span className="menu-bar block w-6 h-0.5 bg-white my-1"></span>
            <span className="menu-bar block w-6 h-0.5 bg-white my-1"></span>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu fixed top-0 left-0 w-full h-full bg-[#060606] z-50">
              <div className="flex justify-between p-4">
                <Image 
                  src={Colorlogonobackground}
                  alt="RealSales Logo" 
                  width={120} 
                  height={40} 
                />
                <button onClick={toggleMobileMenu} className="text-2xl text-white">&times;</button>
              </div>
              <ul className="px-4">
                <li className="py-2 border-b text-white"><Link href="/">Home</Link></li>
                <li className="py-2 border-b text-white"><Link href="/about">About</Link></li>
                <li className="py-2 border-b text-white"><Link href="/industries">Industries</Link></li>
                <li className="py-2 border-b text-white"><Link href="/faq">FAQ</Link></li>
                <li className="py-4">
                  <BookAdemo icon={<AddIcCallIcon style={{fontSize: "16px"}}/>}/>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header