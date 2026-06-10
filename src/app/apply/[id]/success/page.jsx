import React from "react";
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import CourseApply from '../components/Course'
import Detail from './components/Detail'
import Line from './components/Line'
import Payment from './components/Payment'



export default async function Success({ params }) {
    const { id } = await params;
    return (
      <div>
        <Navbar />
        <CourseApply items={id} />
        <Detail items={id}/>
        <Line />
        <Payment courseId={id}/>
        <Footer />
      </div>
    );
}
