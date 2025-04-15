import React from "react";
const Sclad = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src="/path-to-logo.svg" alt="Logo" className="h-8" />
          <h1 className="text-xl font-bold text-green-800">App name</h1>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src="/path-to-profile-image.jpg"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800">
            Вийти
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 flex">
        {/* Filters Section */}
        <aside className="w-1/4 bg-white shadow-md rounded-lg p-4 mr-6">
          <h2 className="text-lg font-bold mb-4">Фільтри</h2>
          <div className="mb-4">
            <h3 className="font-bold">Провізія</h3>
            <div className="flex items-center space-x-2">
              <span className="bg-gray-200 px-2 py-1 rounded-md">БК</span>
              <span className="bg-gray-200 px-2 py-1 rounded-md">Зброя</span>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Категорії</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Label Description</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Label Description</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Label Description</span>
              </label>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Кількість</h3>
            <input
              type="range"
              min="0"
              max="10"
              className="w-full mt-2"
            />
          </div>
        </aside>

        {/* Inventory Section */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Пошук"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
            />
            <div className="flex space-x-2">
              <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800">
                Нове
              </button>
              <button className="bg-gray-200 px-4 py-2 rounded-md">
                Зброя NATO
              </button>
              <button className="bg-gray-200 px-4 py-2 rounded-md">
                Українська зброя
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Inventory Card */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <img
                src="/path-to-item1.jpg"
                alt="Item"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <p className="text-sm text-gray-500 mb-2">Замовлення в дорозі</p>
              <p className="text-sm text-gray-500 mb-2">
                Доставка приблизно через: 1 день 20 год
              </p>
              <h3 className="font-bold">FGM-148 Javelin</h3>
              <p className="text-sm text-gray-500">Доступно: 5</p>
            </div>

            {/* Repeat Inventory Card */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <img
                src="/path-to-item2.jpg"
                alt="Item"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <p className="text-sm text-gray-500 mb-2">Немає в наявності</p>
              <h3 className="font-bold">DJI Mavic Pro</h3>
              <p className="text-sm text-gray-500">Доступно: 0</p>
            </div>

            {/* Add more cards as needed */}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white p-4 text-center">
        <div className="flex justify-between">
          <p>Склад</p>
          <a href="/" className="hover:underline">
            На головну
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Sclad;