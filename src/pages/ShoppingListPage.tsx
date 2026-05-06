import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaBell, FaCalendarAlt, FaSignOutAlt, FaShoppingCart, FaArrowLeft, FaDownload, FaChevronDown } from "react-icons/fa";

interface ShoppingItem {
  id: number;
  label: string;
  category: "fruits" | "feculents" | "boucherie" | "cremerie" | "epices";
  checked: boolean;
}

const initialItems: ShoppingItem[] = [
  { id: 1, label: "3 Courgettes", category: "fruits", checked: false },
  { id: 2, label: "4 Tomates", category: "fruits", checked: false },
  { id: 3, label: "2 Aubergines", category: "fruits", checked: false },
  { id: 4, label: "3 Poivrons", category: "fruits", checked: false },
  { id: 5, label: "5 Oignons", category: "fruits", checked: false },
  { id: 6, label: "8 Gousses d'ails", category: "fruits", checked: false },
  { id: 7, label: "4 Pommes", category: "fruits", checked: false },
  { id: 8, label: "Fraises 250g", category: "fruits", checked: false },
  { id: 9, label: "1 Poires", category: "fruits", checked: false },
  { id: 10, label: "Pates 1kg", category: "feculents", checked: false },
  { id: 11, label: "Riz 1kg", category: "feculents", checked: false },
  { id: 12, label: "Quinoa 500g", category: "feculents", checked: false },
  { id: 13, label: "Boeuf 1kg", category: "boucherie", checked: false },
  { id: 14, label: "Poulet", category: "boucherie", checked: false },
  { id: 15, label: "5 laits", category: "cremerie", checked: false },
  { id: 16, label: "Parmesan 200g", category: "cremerie", checked: false },
  { id: 17, label: "Emmental 500g", category: "cremerie", checked: false },
  { id: 18, label: "Raclette 500g", category: "cremerie", checked: false },
  { id: 19, label: "Sucres 1 kg", category: "epices", checked: false },
  { id: 20, label: "Laurier", category: "epices", checked: false },
  { id: 21, label: "Thym", category: "epices", checked: false }
];

const ShoppingListPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);

  useEffect(() => {
    document.title = "Ma liste de courses - Data Chef";
  }, []);

  const handleLogout = () => {
    console.log("Deconnexion");
    navigate("/");
  };

  const toggleItem = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const groupedItems = useMemo(
    () => ({
      fruits: items.filter(item => item.category === "fruits"),
      feculents: items.filter(item => item.category === "feculents"),
      boucherie: items.filter(item => item.category === "boucherie"),
      cremerie: items.filter(item => item.category === "cremerie"),
      epices: items.filter(item => item.category === "epices")
    }),
    [items]
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-72 bg-[#8ACBFF] text-white flex flex-col fixed h-screen">
        <Link to="/" className="p-8 block">
          <h1 className="text-2xl font-bold">DATA CHEF</h1>
        </Link>

        <div className="px-6 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=8ACBFF&color=fff&size=56"
                alt="John Doe"
                className="w-full h-full"
              />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-base">John Doe</p>
              <p className="text-sm text-white/80">johndoe@gmail.com</p>
            </div>
          </div>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          <Link
            to="/profil"
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaCog className="text-xl flex-shrink-0" />
            <span className="text-base">Paramètres</span>
          </Link>
          <Link
            to="/notifications"
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaBell className="text-xl flex-shrink-0" />
            <span className="text-base">Notifications</span>
          </Link>
          <Link
            to="/calendrier"
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaCalendarAlt className="text-xl flex-shrink-0" />
            <span className="text-base">Mon planning</span>
          </Link>
          <Link
            to="/shopping-list"
            className="flex items-center justify-between px-5 py-3 bg-white/20 rounded-lg"
          >
            <span className="flex items-center gap-4">
              <FaShoppingCart className="text-xl flex-shrink-0" />
              <span className="text-base">Ma liste de Courses</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors text-left"
          >
            <FaSignOutAlt className="text-xl flex-shrink-0" />
            <span className="text-base">Deconnexion</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 ml-72 p-8 lg:p-10">
        <div className="max-w-5xl mx-auto">
          <Link to="/calendrier" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium">
            <FaArrowLeft />
            Retour au planning
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mt-5 mb-5">Ta liste de courses de la semaine</h1>

          <div className="bg-white border border-[#d8e3ea] rounded-2xl px-6 py-4 mb-8 max-w-2xl mx-auto">
            <p className="text-gray-600 text-sm text-center">
              <span className="font-semibold text-gray-700">Astuce :</span> Cliquez sur les cases pour cocher les articles deja dans votre panier.
            </p>
          </div>

          <section className="bg-white rounded-3xl shadow-xl px-6 md:px-8 py-6 md:py-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 className="text-3xl md:text-2xl font-bold text-gray-800">Vos courses</h2>
              <span className="bg-[#8ACBFF] text-white text-sm font-semibold px-4 py-1 rounded-full">{items.length} articles</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-7 pt-6">
              <div>
                <h3 className="text-[#8ACBFF] font-bold text-xl md:text-lg mb-3 border-l-4 border-[#8ACBFF] pl-2">Fruits & legumes</h3>
                <div className="space-y-2.5">
                  {groupedItems.fruits.map(item => (
                    <label key={item.id} className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#8ACBFF] focus:ring-[#8ACBFF]"
                      />
                      <span className={item.checked ? "line-through text-gray-400" : ""}>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[#8ACBFF] font-bold text-xl md:text-lg mb-3 border-l-4 border-[#8ACBFF] pl-2">Feculents</h3>
                <div className="space-y-2.5">
                  {groupedItems.feculents.map(item => (
                    <label key={item.id} className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#8ACBFF] focus:ring-[#8ACBFF]"
                      />
                      <span className={item.checked ? "line-through text-gray-400" : ""}>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[#8ACBFF] font-bold text-xl md:text-lg mb-3 border-l-4 border-[#8ACBFF] pl-2">Boucherie / Poissonnerie</h3>
                <div className="space-y-2.5">
                  {groupedItems.boucherie.map(item => (
                    <label key={item.id} className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#8ACBFF] focus:ring-[#8ACBFF]"
                      />
                      <span className={item.checked ? "line-through text-gray-400" : ""}>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[#8ACBFF] font-bold text-xl md:text-lg mb-3 border-l-4 border-[#8ACBFF] pl-2">Cremerie</h3>
                <div className="space-y-2.5">
                  {groupedItems.cremerie.map(item => (
                    <label key={item.id} className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#8ACBFF] focus:ring-[#8ACBFF]"
                      />
                      <span className={item.checked ? "line-through text-gray-400" : ""}>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[#8ACBFF] font-bold text-xl md:text-lg mb-3 border-l-4 border-[#8ACBFF] pl-2">Epices & condiments</h3>
                <div className="space-y-2.5">
                  {groupedItems.epices.map(item => (
                    <label key={item.id} className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#8ACBFF] focus:ring-[#8ACBFF]"
                      />
                      <span className={item.checked ? "line-through text-gray-400" : ""}>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center mt-9">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#7ec1f4] text-white rounded-full text-base font-semibold shadow-lg hover:bg-[#6cb4ea] transition-colors">
              <FaDownload className="text-sm" />
              Exporter ma liste
              <FaChevronDown className="text-xs" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoppingListPage;
