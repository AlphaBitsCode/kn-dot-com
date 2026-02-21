import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SandBatteryPatent from "./pages/SandBatteryPatent";
import SandBatteryExperiment from "./pages/SandBatteryExperiment";
import KentNguyenContact from "./pages/KentNguyenContact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/sand-battery-patent-download" element={<SandBatteryPatent />} />
          <Route path="/sand-battery-experiment" element={<SandBatteryExperiment />} />
          <Route path="/kent-nguyen-contact/" element={<KentNguyenContact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
