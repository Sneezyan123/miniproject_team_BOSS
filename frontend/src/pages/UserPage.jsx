import React from "react";

const UserPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <img
            src="/path-to-logo.svg"
            alt="Logo"
            className="h-8"
          />
          <h1 className="text-xl font-bold text-green-800">App name</h1>
        </div>
      </header>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/path-to-profile-image.jpg"
          alt="User"
          className="w-40 h-40 rounded-full object-cover mb-4"
        />
        <div className="text-center">
          <h2 className="text-lg font-bold">Ім'я: Віктор</h2>
          <p>Прізвище: Петренко</p>
          <p>По батькові: Давидович</p>
          <p>Посада: сержант</p>
          <p>Підрозділ: 72-га окрема механізована бригада імені Чорних Запорожців</p>
          <a
            href="/inventory"
            className="text-green-700 hover:underline"
          >
            Наявне спорядження: переглянути склад
          </a>
        </div>
        <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800">
          Вийти
        </button>
      </div>

      {/* Recent Requests Section */}
      <section>
        <h3 className="text-xl font-bold text-green-800 mb-4">Останні запити</h3>
        <div className="grid grid-cols-1 gap-4">
          {/* Request Card */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-start space-x-4">
            <img
              src="/path-to-icon1.svg"
              alt="Icon"
              className="h-8 w-8"
            />
            <div>
              <h4 className="font-bold">Lorem ipsum</h4>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Repeat Request Card */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-start space-x-4">
            <img
              src="/path-to-icon2.svg"
              alt="Icon"
              className="h-8 w-8"
            />
            <div>
              <h4 className="font-bold">Lorem ipsum</h4>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserPage;