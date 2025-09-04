"use client"
import React, { useEffect } from "react";

export default function Profile({ params }) {
  var code = params.code

  useEffect(() => {
    if (code == "ecwx") {
      window.location.href = "https://nj.dekhub.com/web";
    } else {
      window.location.href = "https://nj.dekhub.com/web";
    }
  }, [code == "ecwx"]);
  return null;
};

