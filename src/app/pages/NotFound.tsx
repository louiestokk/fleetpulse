import { Link } from "react-router";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-sm font-medium text-blue-600 mb-2">404</p>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Sidan hittades inte
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Adressen du försökte öppna finns inte. Gå tillbaka till dashboard för att
        fortsätta övervaka flottan.
      </p>
      <Link to="/app">
        <Button>Tillbaka till Dashboard</Button>
      </Link>
    </div>
  );
}
