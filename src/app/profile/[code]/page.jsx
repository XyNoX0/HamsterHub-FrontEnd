"use client"
import React, { useEffect } from "react";

export default function Profile({ params }) {
  var code = params.code

  useEffect(() => {
    if (code == "ecwx") {
      window.location.href = "https://nj.dekhub.com/web";
    } else {
      return null;
    }
  }, [code == "ecwx"]);
  return null;

};

