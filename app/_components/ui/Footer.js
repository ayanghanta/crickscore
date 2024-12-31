import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} cricSnap. All rights reserved. |
          Made with 💚 by{" "}
          <Link href="https://x.com/im_ayangh" className="hover:underline">
            Ayan
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
