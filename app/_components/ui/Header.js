import Link from "next/link";

function Header() {
  return (
    <header className="bg-green-600 text-white">
      <div className="container mx-auto flex justify-between items-center py-2 px-6">
        <Link href="/">
          <h1 className="text-3xl font-bold">CricSnap</h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;
