declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Support for third-party CSS side-effect imports
declare module "swiper/css";
declare module "swiper/css/pagination";
declare module "swiper/css/navigation";
declare module "swiper/css/effect-fade";
declare module "swiper/css/autoplay";
