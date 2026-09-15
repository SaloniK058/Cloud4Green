import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Enterprise from "@/pages/Enterprise";
import Individual from "@/pages/Individual";
import Notfound from "@/pages/Notfound";
import Home from "./pages/Home";
import Contact from "@/pages/Contact";
import EnterpriseLabs from "@/pages/products/EnterpriseLabs";
import ELearning from "@/pages/ELearning";
import Certifications from "@/pages/Certifications";

function App() {
  return (
    <BrowserRouter>
      {/* Every route arrives at the top. Inside the router, above the routes,
          so it sees the location change before the new page renders. */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/individual" element={<Individual/>}/>
        <Route path="/contact" element={<Contact/>}/>
        {/* Products — linked from the navbar mega menu (src/config/navigation.js).
            The other two items there have no route yet and fall through to Notfound. */}
        <Route path="/products/enterprise-labs" element={<EnterpriseLabs />} />
        <Route path="/products/e-learning" element={<ELearning />} />
        <Route path="/products/certifications" element={<Certifications />} />
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
