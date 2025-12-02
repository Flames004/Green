import {
  LayoutDashboard,
  Leaf,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/plants", label: "Plants", icon: Leaf },
    { href: "/admin/pots", label: "Pots", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <aside className="lg:block hidden h-screen  bg-gray-200/50   flex-col font-medium border-r border-gray-300">
        <div className="text-xl font-bold p-5 border-b border-gray-300">
           GreenLand
        </div>

        <nav className="flex-1 p-4 mt-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition 
                    ${
                      isActive
                        ? "bg-emerald-700 text-white"
                        : "text-black hover:bg-emerald-200/50 hover:text-black"
                    }`
                    }
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md z-50">
        <ul className="flex justify-around items-center h-14">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <li key={index}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center text-xs 
              ${isActive ? "text-emerald-600 font-semibold" : "text-gray-500"}`
                  }
                >
                  <Icon size={22} />
                  <span className="text-[10px]">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
