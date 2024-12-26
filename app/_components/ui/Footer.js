function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Scorely. All rights reserved. | Made
          with 🤍 by Ayan
        </p>
      </div>
    </footer>
  );
}

export default Footer;
