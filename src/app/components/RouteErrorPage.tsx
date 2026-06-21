import { isRouteErrorResponse, useRouteError } from "react-router";
import { Link } from "react-router";
import { Button } from "./ui/button";

export function RouteErrorPage() {
  const error = useRouteError();

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Något gick fel";

  const message = isRouteErrorResponse(error)
    ? "Sidan du försökte öppna finns inte."
    : error instanceof Error
      ? error.message
      : "Ett oväntat fel inträffade.";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      <p className="text-sm font-medium text-red-600 mb-2">Fel</p>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      <Link to="/app">
        <Button>Tillbaka till Dashboard</Button>
      </Link>
    </div>
  );
}
