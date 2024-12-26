"use client";

import Link from "next/link";

function Button({ type = "normal", onClick, children, href, role = "button" }) {
  const styles = {
    normal: `bg-gray-300 text-black hover:bg-gray-400 space-x-2 px-2 py-1 transition duration-200 font-bold text-lg`,
    option: ` bg-gray-500 text-white w-full`,
    primary: `bg-indigo-600 hover:bg-indigo-700 transition duration-300 font-bold text-white text-xl rounded-sm px-4 py-2`,
    next: `w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-700 transition-all`,
    modalRun:
      "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-black px-4 py-2 rounded border border-gray-300 transition duration-200 font-semibold text-lg",
    modalPrimary:
      "bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-800  transition duration-200",
    modalSecondary:
      "bg-slate-200 text-slate-800 px-4 py-2 rounded-md font-semibold hover:bg-slate-300 transition duration-200",
  };
  if (href)
    return (
      <Link href={href} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} className={styles[type]} role={role}>
      {children}
    </button>
  );
}

export default Button;
