import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ApplyForm from './components/ApplyForm'
import './Apply.css'

async function Apply({ params }) {
  const { id } = await params;
  return (
    <div className='gallery'>
      <Navbar />
      <ApplyForm items={id}/>
      <Footer />
    </div>
  )
}

export default Apply
