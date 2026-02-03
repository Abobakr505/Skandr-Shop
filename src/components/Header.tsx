import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Home, Utensils, Users, Phone } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export default function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (location.pathname === '/' && element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }

    navigate(`/#${id}`);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'menu', label: 'قائمة الطعام', icon: Utensils },
    { id: 'about', label: 'من نحن', icon: Users },
    { id: 'contact', label: 'اتصل بنا', icon: Phone },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white fixed inset-x-0 top-0 shadow-md z-50"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-12 h-12 bg-[#004f49] rounded-md flex items-center justify-center">
              <img src="/about.jpg" alt="شعار إسكندر" />
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-[#004f49]">إسكندر</h1>
              <p className="text-xs text-gray-600">كبدة إسكندراني أصلية</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-[#004f49] transition-colors font-medium relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#004f49] after:w-0 hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative p-2 bg-[#004f49] text-white rounded-md"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#002c29] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </motion.button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 " />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-6 left-6 text-[#004f49]"
                >
                  <X className="w-8 h-8" />
                </button>

                <motion.nav
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-2 mt-20"
                >
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        variants={itemVariants}
                        onClick={() => scrollToSection(item.id)}
                        className="flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-[#004f49]/5 transition-all group"
                      >
                        <Icon className="w-7 h-7 text-[#004f49]" />
                        <span className="text-lg font-medium flex-1 text-right">
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
