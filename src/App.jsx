import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import RouteSeo from "@/components/layout/RouteSeo";
import Enterprise from "@/pages/Enterprise";
import Notfound from "@/pages/NotFound";
import Home from "./pages/Home";
import Contact from "@/pages/Contact";
import EnterpriseLabs from "@/pages/products/EnterpriseLabs";
import ELearning from "@/pages/products/ELearning";
import Certifications from "@/pages/products/Certifications";
import EnterpriseTraining from "@/pages/products/EnterpriseTraining";
import Automation from "@/pages/services/Automation";
import Consulting from "@/pages/services/Consulting";
import CustomerStories from "@/pages/CustomerStories";
import WhatsNew from "@/pages/WhatsNew";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

/* Every page ships in the one bundle, deliberately. Route-level splitting was
   tried and measured against this: with Netlify's Brotli the whole bundle is
   ~225 KB on the wire, so splitting saved ~55 KB but added a request and a
   Suspense round-trip to every page — sub-pages came up 150–370ms later on a
   throttled phone profile, and only the homepage got (45ms) faster. Revisit
   if the bundle grows well past this. */
function App() {
  return (
    <BrowserRouter>
      {/* Every route arrives at the top. Inside the router, above the routes,
          so it sees the location change before the new page renders. */}
      <ScrollToTop />
      {/* Title, description, canonical and structured data per route —
          the data lives in src/config/seo.js. */}
      <RouteSeo />

      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About />} />
        {/* Products — linked from the navbar mega menu (src/config/navigation.js). */}
        <Route path="/products/enterprise-labs" element={<EnterpriseLabs />} />
        <Route path="/products/e-learning" element={<ELearning />} />
        <Route path="/products/certifications" element={<Certifications />} />
        <Route path="/products/enterprise-training" element={<EnterpriseTraining />} />
        {/* Services — linked from the Services tab of the navbar mega menu. */}
        <Route path="/services/automation" element={<Automation />} />
        <Route path="/services/consulting" element={<Consulting />} />
        {/* Customer stories — the mega menu promos and the top-level nav item. */}
        <Route path="/customers" element={<CustomerStories />} />
        {/* What's new — the Products mega menu promo. */}
        <Route path="/whats-new" element={<WhatsNew />} />
        {/* Legal — linked from the footer. */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
