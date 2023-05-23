import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.png";
import LogoWhite from "../assets/logo-white.png";
import Lightning from "../assets/lightning.png";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";

const SiteHeader = ({ children }) => {
    const { setUser } = useAuthContext();
    const navigate = useNavigate();

  // const navigation = [
  //   { name: 'Product', href: '#' },
  //   { name: 'Features', href: '#' },
  //   { name: 'Marketplace', href: '#' },
  //   { name: 'Company', href: '#' },
  // ]
  const handleLogout = () => {
    removeToken();
    setUser(null);
    navigate("/", {replace: true});
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Strikify</span>
              <img className="h-10 w-10" src={Lightning} alt="" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            {getToken() ? <button onClick={handleLogout}>Logout</button> : ""}
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
                    {item.name}
                  </a>
                ))}
              </div> */}
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white">
            <div className="flex items-center justify-between">
              <Link to={'/'} className="-m-1.5 p-1.5">
                <span className="sr-only">Strikify</span>
                <img className="h-20 w-20" src={LogoWhite} alt="" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white-500/10">
                {/* <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-black"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div> */}
                <div className="py-6">
                  <Link
                  to={'/login'}
                    className="-mx-3 block rounded-lg px-7 py-2.5 text-base font-semibold leading-7 bg-white text-black hover:text-black hover:bg-yellow-300"
                  >
                    Log in
                  </Link>
                  <Link
                  to={'/registration'}
                    className="-mx-3 my-5 block rounded-lg px-7 py-2.5 text-base font-semibold leading-7 bg-white text-black hover:text-black hover:bg-yellow-300"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {children}

      <Footer/>
    </div>
  );
};

export default SiteHeader;
