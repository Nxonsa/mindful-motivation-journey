import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Activity, BarChart3, User } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Activity, label: "Training", path: "/training" },
    { icon: BarChart3, label: "Progress", path: "/progress" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-around items-center">
            {navItems.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center p-2 transition-colors ${
                  location.pathname === path
                    ? "text-primary"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;