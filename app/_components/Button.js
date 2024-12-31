"use client";

import Link from "next/link";

function Button({ type = "normal", onClick, children, href, role = "button" }) {
  const styles = {
    normal: `bg-gray-300 text-black hover:bg-gray-400 space-x-2 px-2 py-1 transition duration-200 font-bold text-lg`,
    option: ` bg-gray-200 w-full text-gray-800 hover:bg-gray-400 font-semibold`,
    primary: `backdrop-blur-xl bg-green-600/80 hover:bg-green-700/80 transition duration-300 font-bold text-white text-xl rounded-sm px-4 py-2  inset-0 shadow-lg`,
    next: `w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition-all`,
    modalRun:
      "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-black px-4 py-2 rounded border border-gray-300 transition duration-200 font-semibold text-lg",
    modalPrimary:
      "bg-green-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-800  transition duration-200",
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
