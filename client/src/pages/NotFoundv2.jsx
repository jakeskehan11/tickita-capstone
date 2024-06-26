import { NavLink } from "react-router-dom";

const NotFoundv2 = () => {
  return (
    <main className="ml-60 h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-green-950">404</h1>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <NavLink to="/">
          <p className="rounded-md bg-green-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-950">
            Go to the Homepage
          </p>
        </NavLink>
        <div className="mt-10 flex items-center justify-center gap-x-6"></div>
      </div>
    </main>
  );
};
export default NotFoundv2;
