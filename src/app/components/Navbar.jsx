"use client"
import React, { useEffect, useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { SiPython, SiUnity, SiRoblox } from "react-icons/si";
import { getCourses } from "@/utils/api";
import Link from "next/link"; // Import Link from next/link
import "./Navbar.css";
import Image from "next/image";

export default function Navbar() {
  const [LinkData, setLinkData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const LinkCourseData = await getCourses();
        setLinkData(LinkCourseData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();
  }, [getCourses]);

  if (!LinkData) {
    return
  }

  // const LinkData = await getCourses();
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link href="/">
            <Image
              src="/assets/Hamster.png"
              width={200}
              height={200}
              alt="Hamster Logo"
              className="hamster-logo"
              priority
            />
          </Link>
        </li>
        <div className="nav-wrapper">
          <div className="nav-link">
            <Link href="/python">
              <SiPython className="nav-icon" />
            </Link>

            <Link href="/unity">
              <SiUnity className="nav-icon" />
            </Link>
            <a href="/roblox">
              <SiRoblox className="nav-icon" />
            </a>
          </div>

          <label htmlFor="hamburger-checkbox" className="hamburger-button">
            <HiOutlineBars3 />
          </label>
          <input
            type="checkbox"
            id="hamburger-checkbox"
            className="hamburger-checkbox"
          />
          <div className="dropdown-menu">

            <h1 className="blue">Courses</h1>
            {LinkData.map((item, index) => (
              <Link
                href={`/course/${item.no}`}
                // href={`#`}
                key={index}
                className="dropdown-item"
              >
                <div className="course-list">
                  <h1>{item.subject}</h1>
                </div>
                <hr />
              </Link>
            ))}
            <Link href="/gallery">
              <h3 className="about">Gallery</h3>
            </Link>
            <Link href="/about">
              <h3 className="about">About us</h3>
            </Link>
          </div>
        </div>
      </ul>
    </div>
  );
}
