import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Про застосунок</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Як користуватися</h2>
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Для військовослужбовців:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Зареєструйтеся як військовослужбовець</li>
                <li>Перегляньте доступне спорядження у розділі "Склад"</li>
                <li>Створіть запит на необхідне спорядження</li>
                <li>Відстежуйте статус ваших запитів у розділі "Запити"</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Для логістів:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Зареєструйтеся як логіст</li>
                <li>Керуйте наявним спорядженням</li>
                <li>Обробляйте запити від військовослужбовців</li>
                <li>Оновлюйте інформацію про наявність спорядження</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Зв'язатися з нами</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Електронна пошта:</h3>
                <a href="mailto:support@military-supply.ua" 
                   className="text-green-600 hover:text-green-700">
                  a.onyshchuk.pn@ucu.edu.ua
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Гаряча лінія:</h3>
                <p>+380 77 777 77 77</p>
                <p className="text-sm text-gray-600">
                  Працюємо цілодобово
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Адреса:</h3>
                <p>м. Львів, вул. Козельницька, 42</p>
                <p className="text-sm text-gray-600">
                  Пн-Пт: 9:00 - 18:00
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link 
            to="/" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Розпочати роботу
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
