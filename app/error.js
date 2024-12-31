"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoSadOutline } from "react-icons/io5";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <IoSadOutline className="text-6xl text-red-600" />
      <h1 className="text-5xl font-extrabold mt-4 text-red-600">
        Something went wrong
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        We couldn&apos;t process your request. Please try again later.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="bg-green-600 text-white flex items-center gap-2 px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-300 shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
