import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import RouteSeo from "@/components/layout/RouteSeo";
import { NotFound, routes } from "@/routes";

function App() {
  return (
    <BrowserRouter>
      {/* Every route arrives at the top. Inside the router, above the routes,
          so it sees the location change before the new page renders. */}
      <ScrollToTop />
      {/* Title, description, canonical and structured data per route —
          the data lives in src/config/seo.js. */}
      <RouteSeo />

      {/* Only seen on an in-app move to a page that hasn't been fetched yet.
          The same paper as every page, so that moment is a pause, not a flash. */}
      <Suspense fallback={<div className="min-h-svh bg-[#FAFAF7]" />}>
        <Routes>
          {Object.entries(routes).map(([path, Page]) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
