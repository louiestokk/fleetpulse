import { createBrowserRouter, Navigate, useParams } from "react-router";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { VehicleDetails } from "./pages/VehicleDetails";
import { MaintenanceCenter } from "./pages/MaintenanceCenter";
import { DriverInsights } from "./pages/DriverInsights";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { RouteErrorPage } from "./components/RouteErrorPage";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

function LegacyVehicleRedirect() {
  const { id } = useParams();
  return <Navigate to={`/app/vehicle/${id}`} replace />;
}

export const router = createBrowserRouter(
  [
    { path: "/", Component: Landing },
    {
      path: "/app",
      Component: Layout,
      errorElement: <RouteErrorPage />,
      children: [
        { index: true, Component: Dashboard },
        { path: "vehicle/:id", Component: VehicleDetails },
        { path: "maintenance", Component: MaintenanceCenter },
        { path: "drivers", Component: DriverInsights },
        { path: "*", Component: NotFound },
      ],
    },
    { path: "/index.html", element: <Navigate to="/" replace /> },
    { path: "/dashboard", element: <Navigate to="/app" replace /> },
    { path: "/maintenance", element: <Navigate to="/app/maintenance" replace /> },
    { path: "/drivers", element: <Navigate to="/app/drivers" replace /> },
    { path: "/vehicle/:id", Component: LegacyVehicleRedirect },
    { path: "*", Component: NotFound },
  ],
  basename ? { basename } : undefined
);
