// import { useEffect, useState } from "react";
// import { LoadingScreen } from "@/components/loading-screen";
// import { DashboardSkeleton } from "@/components/dashboard-skeleton";

import { SecurityDashboard } from "./SecurityDashboard";

const HeroComponent = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Your actual dashboard content will go here */}
      {/* <h1>Dashboard Content</h1> */}
      <SecurityDashboard />
    </div>
  );
};

export default HeroComponent;
