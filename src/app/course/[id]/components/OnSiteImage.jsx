import React from "react";
import Image from "next/image";

function OnSiteImage({ courseDetail }) {
  if (courseDetail["no"] == "861"){
    var src = "https://nj.dekhub.com/public/imgs/Python-Onsite.png"
  }else{
    return null
  }
  return (
      <Image src={src} alt="" width={1020} height={1020} className="python-onsite-img"/>
  );
}

export default OnSiteImage;
