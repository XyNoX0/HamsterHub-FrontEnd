import React from "react";
import "./Shop.css";
import Slider from "./Slider";
import Image from "next/image";

const items = [
  
  {
    title: "Gadgets",
    description: "",
    shopItems: [
      {
        title: "Big Enter",
        subtitle: "83",
        image: "https://nj.dekhub.com/public/imgs/Shop/Gadgets/Big_Enter.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/Gadgets/Big_Enter.png",
      },
      {
        title: "Mechanical Keyboard",
        subtitle: "440",
        image: "https://nj.dekhub.com/public/imgs/Shop/Gadgets/Keyboard_Mechanical.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/Gadgets/Keyboard_Mechanical.png",
      },
      {
        title: "Powerbank 66W",
        subtitle: "400",
        image: "https://nj.dekhub.com/public/imgs/Shop/Gadgets/Powerbank_66W.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/Gadgets/Powerbank_66W.png",
      },
      {
        title: "True Wireless Earbuds",
        subtitle: "149",
        image: "https://nj.dekhub.com/public/imgs/Shop/Gadgets/True_Wireless_Earbuds.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/Gadgets/True_Wireless_Earbuds.png",
      }
    ],
  },
  {
    title: "Software",
    description: "",
    shopItems: [
      {
        title: "Aseprite",
        subtitle: "169",
        image: "https://nj.dekhub.com/public/imgs/Shop/Software/Aseprite.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/Software/Aseprite.png",
      },
      {
        title: "Desktop Mate Miku DLC",
        subtitle: "290",
        image: "https://nj.dekhub.com/public/imgs/Shop/Software/Desktop_Mate_Miku_DLC.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/Software/Desktop_Mate_Miku_DLC.png",
      },
      {
        title: "Wallpaper Engine",
        subtitle: "59",
        image: "https://nj.dekhub.com/public/imgs/Shop/Software/Wallpaper_Engine.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/Software/Wallpaper_Engine.png",
      }
    ],
  },
  {
    title: "Art & Style",
    description: "",
    shopItems: [
      {
        title: "Aura Studio Speaker",
        subtitle: "400",
        image: "https://nj.dekhub.com/public/imgs/Shop/ArtStyle/Aura_Studio_Speaker.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/ArtStyle/Aura_Studio_Speaker.png",
      },
      {
        title: "Backpack",
        subtitle: "290",
        image: "https://nj.dekhub.com/public/imgs/Shop/ArtStyle/Backpack.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/ArtStyle/Backpack.png",
      },
      {
        title: "Duck Lamp",
        subtitle: "190",
        image: "https://nj.dekhub.com/public/imgs/Shop/ArtStyle/Duck_Lamp.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/ArtStyle/Duck_Lamp.png",
      },
      {
        title: "LED Mousepad",
        subtitle: "149",
        image: "https://nj.dekhub.com/public/imgs/Shop/ArtStyle/LED_Mouse_Pad.png",
        content: "https://nj.dekhub.com/public/imgs/Shop/ArtStyle/LED_Mouse_Pad.png",
      },
     
    ],
  }
];


function ShopSlider() {
  return (
    <div className="shop">
      {items.map((group, groupIndex) => (
        <div key={groupIndex} className="shop-slider">
          <div className="shop-text">
            <h2>{group.title}</h2>
            <p>{group.description}</p>
          </div>
          <Slider items={group.shopItems} id="shop-slider" />
        </div>
      ))}
    </div>
  );
}

export default ShopSlider;
