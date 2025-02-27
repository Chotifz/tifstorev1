import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaBox, FaUsers, FaShoppingCart, FaCog } from 'react-icons/fa';

export default function Sidebar() {
  const router = useRouter();
  
  const menuItems = [
    { path: '/admin', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/products', icon: <FaBox />, label: 'Products' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/orders', icon: <FaShoppingCart />, label: 'Orders' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ];
  
  return (
    <aside className="bg-secondary text-white w-64 min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center p-2 rounded ${
                    router.pathname === item.path ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}