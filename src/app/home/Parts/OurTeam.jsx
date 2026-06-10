"use client";
import React from "react";
import "./OurTeam.css";
import Image from "next/image";

const teamMembers = [
  { name: "P'Pub", image: "/assets/hamsterimg1.png", className: "tm-pub" },
  { name: "P'Focus", image: "/assets/hamsterimg1.png", className: "tm-focus" },
  { name: "P'Pukkerr", image: "/assets/hamsterimg1.png", className: "tm-pukkerr" },
  { name: "P'Maymay", image: "/assets/hamsterimg1.png", className: "tm-maymay" },
  { name: "P'Patrick", image: "/assets/hamsterimg1.png", className: "tm-patrick" },
];

function OurTeam() {
  return (
    <section className="our-team">
      <h2 className="our-team-title">Our Team</h2>

      <div className="our-team-scene">
        {/* Grass hills background */}
        <div className="ot-grass-back" />
        <div className="ot-grass-front" />

        {/* Characters */}
        <div className="ot-characters">
          {teamMembers.map((member, index) => (
            <div key={index} className={`ot-member ${member.className}`}>
              <span className="ot-name">{member.name}</span>
              <div className="ot-avatar">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
