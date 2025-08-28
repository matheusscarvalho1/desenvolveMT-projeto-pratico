const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold tracking-wide">
            <a
              href="/"
              className="transition-colors duration-200 hover:text-gray-200"
            >
              Polícia Judiciária Civil de Mato Grosso
            </a>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
