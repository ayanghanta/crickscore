import Link from "next/link";
import { IoHome } from "react-icons/io5";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <h1 className="text-6xl font-extrabold text-green-600">404</h1>
      <p className="text-lg text-gray-600 mt-4">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="bg-green-600 text-white flex items-center gap-2 px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-300 shadow-md"
        >
          <IoHome className="text-xl" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
