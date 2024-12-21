"use client";

function Button({ type = "normal", onClick, children }) {
  const baseStyle = `bg-gray-200 text-black hover:bg-gray-300 space-x-2 px-2 py-1 `;
  const styles = {
    normal: baseStyle + ` `,
  };
  return (
    <button onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
