import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StoragePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();

  const mockData = [
    {
      id: 1,
      name: "FGM-148 Javelin",
      image: "/javelin.jpg",
      available: 5,
    },
    {
      id: 2,
      name: "DJI Mavic Pro",
      image: "/drone.jpg",
      available: 0,
    },
    {
      id: 3,
      name: "Сухий пайок ЗСУ",
      image: "/food.jpg",
      available: 25,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/tryzub.svg" alt="Logo" className="h-8" />
            <h1 className="text-xl font-semibold">App name</h1>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src="/user-avatar.jpg" 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-green-700"
            />
            <button 
              onClick={logout}
              className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700"
            >
              Вийти
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-bold text-lg mb-4">Фільтри</h2>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                    Провіалс ×
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                    БК ×
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                    Зброя ×
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Категорії</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>Назва</span>
                    </label>
                    <p className="text-sm text-gray-600 ml-6">Опис</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Кількість</h3>
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="100"
                  />
                  <div className="text-sm text-gray-600">0-100</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="search"
                  placeholder="Пошук"
                  className="flex-1 px-4 py-2 border rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-800 text-white rounded">
                  Нове
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded">
                  Зброя НАТО
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded">
                  Українська зброя
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockData.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.available === 0
                        ? "Немає в наявності"
                        : `Доступно: ${item.available}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-green-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-3 flex justify-between">
          <Link to="/storage">Склад</Link>
          <Link to="/">На головну</Link>
        </div>
      </footer>
    </div>
  );
};

export default StoragePage;
