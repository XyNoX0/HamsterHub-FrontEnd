import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Profile from "./components/Profile"

import "./Member.css";

import { GetMemberData } from "@/utils/api";

export default async function MemberPage({ searchParams }) {
    const id = searchParams.id;

    if (!id) {
        return (
            <div className="loading-container">
                <p className="loading-text">Missing ID</p>
            </div>
        );
    }

    try {
        const Data = await GetMemberData(id);

        if (!Data) {
            return (
                <div className="loading-container">
                    <p className="loading-text">Member not found</p>
                </div>
            );
        }

        return (
            <div>
                <Navbar />
                <Profile Data={Data} />
                <Footer />
            </div>
        );
    } catch (error) {
        console.error("Error fetching member data:", error);
        return (
            <div className="loading-container">
                <p className="loading-text">Error</p>
            </div>
        );
    }
}