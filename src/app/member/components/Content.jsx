"use client";

import React, { useEffect } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Profile from "./Profile"

import "./Content.css";

import { GetMemberData } from "@/utils/api";

function Content() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    var [Data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetMemberData(id);
                setData(data);
            } catch (error) {
                console.error("Error fetching member data:", error);
            }
        };
        if (id) fetchData();
    }, [id]);
    
    if (!Data) {
        return (
            <div className="loading-container">
                <div className="spinner" />
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Profile Data={Data}/>
            <Footer />
        </div>
    );
}


export default Content;