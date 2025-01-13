import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaStore, FaTicketAlt, FaUserPlus,FaSignOutAlt  } from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FaHome, text: 'Dashboard' },
    { path: '/users', icon: FaUsers, text: 'Users' },
    { path: '/vendors', icon: FaStore, text: 'Vendors' },
    { path: '/complaints', icon: FaTicketAlt, text: 'Complaints' },
    { path: '/vendor-requests', icon: FaUserPlus, text: 'Vendor Requests' },
  ];
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <div className=" duration-175 linear flex h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 relative transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0">
         <div className={`mx-[56px] mt-[30px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          ven <span className="font-medium">sync</span>
        </div>
      </div>
      <nav className="mt-[45px] mb-7 h-px  flex-grow">

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-300 dark:hover:bg-navy-600 hover:bg-gray-100 ${
              location.pathname === item.path ? 'font-bold text-navy-700 dark:text-white': 'font-medium text-gray-600'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.text}</span>
          </Link>
        ))}
  
      </nav>
      <div className="absolute inset-x-0 bottom-2 flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center px-8 py-3 font-semibold w-40 text-lg rounded-full bg-gradient-to-b from-brand-500 to-brand-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
        >
          <FaSignOutAlt className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar