const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold tracking-wide">Desenvolve MT</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <a
            href="/"
            className="transition-colors duration-200 hover:text-gray-200"
          >
            Home
          </a>
          <a
            href="/details"
            className="transition-colors duration-200 hover:text-gray-200"
          >
            Details page
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
