import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ShopSlider from './components/Shop'
import ShopHeader from './components/ShopHeader'
import './Shop.css'

function page() {
  return (
    <div className='shop'>
        <Navbar/>
        <ShopHeader/>
        <ShopSlider/>
        <Footer/>
        </div>
  )
}

export default page