import {Link} from "react-router-dom";
import logo from "@/assets/images/C4GLogo.png"
import footerLogo from "@/assets/images/C4GLogoCropped.png"
export default function Logo({placement= "navbar"}) {
  const isFooter = placement === 'footer';
  return (
    <Link 
    to="/"
    className="inline-flex">
      <img src={isFooter ? footerLogo : logo}
    alt=""
    className="
    h-16
    "/>
    </Link>
  );
}


