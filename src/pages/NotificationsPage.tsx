import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaBell, FaCalendarAlt, FaSignOutAlt, FaShoppingCart, FaCheck, FaTrash, FaFilter, FaBook, FaStar } from "react-icons/fa";

interface Notification {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  icon: string;
  iconColor: string;
}

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "shopping",
      title: "Liste de courses prête",
      description: "Votre liste de courses pour la semaine est disponible. N'oubliez pas les tomates pour la ratatouille !",
      time: "Il y a 5 minutes",
      isRead: false,
      icon: "cart",
      iconColor: "bg-green-100 text-green-500"
    },
    {
      id: 2,
      type: "recipe",
      title: "Nouvelle recette suggérée",
      description: "Découvrez notre nouvelle recette : Poulet rôti aux herbes de Provence",
      time: "Il y a 1 heure",
      isRead: false,
      icon: "book",
      iconColor: "bg-blue-100 text-blue-500"
    },
    {
      id: 3,
      type: "planning",
      title: "Planning de la semaine",
      description: "Votre planning culinaire pour la semaine prochaine est prêt à être consulté",
      time: "Il y a 2 heures",
      isRead: true,
      icon: "calendar",
      iconColor: "bg-orange-100 text-orange-500"
    },
    {
      id: 4,
      type: "reminder",
      title: "Rappel : Préparation du dîner",
      description: "Il est temps de commencer la préparation de vos pâtes au pesto (25 min)",
      time: "Il y a 3 heures",
      isRead: true,
      icon: "bell",
      iconColor: "bg-yellow-100 text-yellow-500"
    },
    {
      id: 5,
      type: "catalog",
      title: "Nouveau catalogue disponible",
      description: "Découvrez 15 nouvelles recettes healthy ajoutées cette semaine",
      time: "Il y a 1 jour",
      isRead: false,
      icon: "star",
      iconColor: "bg-purple-100 text-purple-500"
    },
    {
      id: 6,
      type: "promotion",
      title: "Promotions de la semaine",
      description: "Les légumes de saison sont en promotion ! Ajoutez votre liste de courses.",
      time: "Il y a 1 jour",
      isRead: true,
      icon: "cart",
      iconColor: "bg-green-100 text-green-500"
    },
    {
      id: 7,
      type: "saved",
      title: "Recette sauvegardée",
      description: "Votre recette de Pizza Pepperoni a été ajoutée à vos favoris",
      time: "Il y a 2 jours",
      isRead: true,
      icon: "book",
      iconColor: "bg-blue-100 text-blue-500"
    }
  ]);

  useEffect(() => {
    document.title = "Notifications - Data Chef";
  }, []);

  const handleLogout = () => {
    console.log("Déconnexion");
    navigate("/");
  };

  const toggleRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "cart":
        return <FaShoppingCart className="text-xl" />;
      case "book":
        return <FaBook className="text-xl" />;
      case "calendar":
        return <FaCalendarAlt className="text-xl" />;
      case "bell":
        return <FaBell className="text-xl" />;
      case "star":
        return <FaStar className="text-xl" />;
      default:
        return <FaBell className="text-xl" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#8ACBFF] text-white flex flex-col fixed h-screen">
        {/* Logo */}
        <Link to="/" className="p-8 block">
          <h1 className="text-2xl font-bold">DATA CHEF</h1>
        </Link>

        {/* Profil utilisateur */}
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

        {/* Menu de navigation */}
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
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaShoppingCart className="text-xl flex-shrink-0" />
            <span className="text-base">Ma liste de Courses</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors text-left"
          >
            <FaSignOutAlt className="text-xl flex-shrink-0" />
            <span className="text-base">Déconnexion</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10">
        <div className="max-w-4xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-[#7CCB7D] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaBell className="text-2xl text-white" />
                </div>
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">Notifications</h1>
                <p className="text-gray-500 text-sm">5 min</p>
                <p className="text-gray-500 text-sm">lulu</p>
              </div>
            </div>
            <button className="p-3 bg-white rounded-xl border-2 border-gray-200 hover:border-[#7CCB7D] transition-all">
              <FaFilter className="text-[#7CCB7D] text-lg" />
            </button>
          </div>

          {/* Message */}
          <div className="flex items-center gap-2 mb-6">
            <FaCheck className="text-[#7CCB7D]" />
            <p className="text-gray-600">Vous manquez comme la</p>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all relative ${
                  !notification.isRead ? "border-l-8 border-[#7CCB7D]" : ""
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${notification.iconColor} flex items-center justify-center flex-shrink-0`}>
                    {getIcon(notification.icon)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800 mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => toggleRead(notification.id)}
                      className={`p-2 rounded-lg transition-all ${
                        notification.isRead
                          ? "text-gray-300 hover:text-[#7CCB7D]"
                          : "text-[#7CCB7D]"
                      }`}
                    >
                      <FaCheck className="text-lg" />
                    </button>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-red-400 hover:text-red-600 rounded-lg transition-all"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
