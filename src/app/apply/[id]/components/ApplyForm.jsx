"use client";
import React, { useEffect } from "react";
import "./ApplyForm.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Hams from "./Hams.png"
import CourseApply from './Course'
import { submitApplication, getCourseData } from "../../../../utils/api";


function ApplyForm({ items }) {
  const [formData, setFormData] = useState({
    id: "",
    no: "",
    subject: "",
    price: "",
    discount: "",
    fullName: "",
    nickname: "",
    age: "",
    phone: "",
    experience: "",
    ref: "",
  });

  var id = items
  var [courseData, setCourseData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourseData(id);
        setCourseData(data.course);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();

  }, [id]);

  const router = useRouter(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    // console.log("courseData",courseData)
    formData["id"] = courseData.id
    formData["no"] = courseData.no
    formData["subject"] = courseData.subject
    formData["price"] = courseData.price
    formData["discount"] = courseData.discount
    // console.log("Form submitted with data:", formData);

    // Call the API utility
    try {
      const res = await submitApplication(formData);
      console.log("res", res.ref);  
      router.push(`/apply/${id}/success?ref=${res.ref}`);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="apply">
      <CourseApply items={id} />
      <div className="min-h-screen bg-gray-100">
        <div className="p-4 shadow-md bg-white rounded-md">
          <h1 className="text-2xl mb-4 text-black">Registration</h1>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full h-full p-2 border border-gray-300 rounded text-black"
              placeholder="👤  Fullname"
              required
            />
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full h-full p-2 border border-gray-300 rounded text-black"
              placeholder="🧑‍🤝‍🧑  Nick"
              required
            />
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full h-full p-2 border border-gray-300 rounded text-black"
              placeholder="🎂  Age"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              pattern="^\d{10}$"
              onChange={handleChange}
              className="w-full h-full p-2 border border-gray-300 rounded text-black"
              placeholder="📱  Mobile"
              required
            />
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full h-full p-2 border border-gray-300 rounded text-black"
              placeholder="💼  Skills"
            />
            <input
              type="text"
              name="ref"
              value={formData.ref}
              onChange={handleChange}
              className="w-full h-full p-2 border border-gray-300 rounded text-black"
              placeholder="🔢  Code (optional)"
            />
            <button
              type="submit"
              style={{ marginTop: '5%' }}
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Submit
            </button>
            <Image className="Hams" src={Hams} alt="Hams" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyForm;
