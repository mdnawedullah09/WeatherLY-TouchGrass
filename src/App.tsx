import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import MapPage from "./pages/Map/MapPage";
import AlertsPage from "./pages/Alerts/AlertsPage";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import EcoReelsPage from "./pages/EcoReels/EcoReelsPage";
import AboutPage from "./pages/About/AboutPage";
import AssistantPage from "./pages/Assistant/AssistantPage";
import AdvisoryPage from "./pages/Advisory/AdvisoryPage";
import CommunityPage from "./pages/Community/CommunityPage";
import { MobileAppLayout } from "./components/layout/MobileAppLayout";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] text-slate-900">
      <h1 className="text-6xl font-bold text-sky-500">404</h1>
      <p className="mt-4 text-xl text-slate-400">Page not found</p>
      <Link to="/" className="mt-6 text-sky-500 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
                <Route element={<MobileAppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/maps" element={<MapPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/eco-reels" element={<EcoReelsPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/advisory" element={<AdvisoryPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Route>
        
                <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;