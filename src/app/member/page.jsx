import { cookies } from 'next/headers';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Profile from "./components/Profile";

import "./Member.css";

export default async function MemberPage() {
    let disData = null;
    const cookieStore = cookies();
    const discordDataCookie = cookieStore.get('discord_data');

    if (discordDataCookie) {
        try {
            disData = JSON.parse(discordDataCookie.value);
        } catch (error) {
            console.error("Failed to parse discord data from cookie:", error);
        }
    }

    if (!disData) {
        return (
            <div className="loading-container">
                <p className="loading-text">Loading...</p>
            </div>
        );
    }
    return (
        <div>
            <Navbar />
            
            <Profile DiscordData={disData} />
            <Footer />
        </div>
    );
}