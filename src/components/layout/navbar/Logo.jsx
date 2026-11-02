import {Link} from "react-router-dom";
import logo from "@/assets/images/C4GLogo.webp"
import logoPlain from "@/assets/images/C4GLogoplain.webp"
import footerLogo from "@/assets/images/C4GLogoCropped.webp"
export default function Logo({placement= "navbar", scrolled = false}) {
  const isScrolled = scrolled;
  return (
    <Link
    to="/"
    aria-label="Cloud4Green home"
    className="inline-flex">
      {/* The link carries the name, so the image stays decorative. */}
      <img src={isScrolled ? logoPlain : placement === 'footer' ? footerLogo : logo}
    alt=""
    width={isScrolled ? 64 : placement === "footer" ? 96 : 234}
    height={64}
    fetchPriority={placement === "footer" ? undefined : "high"}
    className="
    h-16
    w-auto
    "/>
    </Link>
  );
}