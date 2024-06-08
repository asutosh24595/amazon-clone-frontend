import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useRef, useState } from "react";
import SidebarContent from "./SidebarContent";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function BottomHeader() {
  const ref = useRef();
  const [showSidebar, setShowSidebar] = useState(false);
  const userData = useSelector((state) => state.amazon.userInfo);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.contains(ref.current)) {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSidebar]);

  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
      <ul className="flex gap-2 text-sm tracking-wide">
        <li onClick={() => setShowSidebar(true)} className="headerHover gap-1">
          <MenuIcon />
          All
        </li>
        <li className="headerHover hidden md:inline-flex">Today's Deals</li>
        <li className="headerHover hidden md:inline-flex">Customer Service</li>
        <li className="headerHover hidden md:inline-flex">Gift Cards</li>
        <li className="headerHover hidden md:inline-flex">Registry</li>
        <li className="headerHover hidden md:inline-flex">Sell</li>
      </ul>

      {showSidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-50">
          <div className="w-full h-full relative">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[80%] md:w-[350px] h-full bg-white border border-black overflow-y-auto"
            >
              <div className="w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4">
                <AccountCircleIcon />
                <h3 className="font-titleFont font-bold text-lg tracking-wide">
                  Hello, {userData.userName ? userData.userName : "Sign In"}
                </h3>
              </div>
              <SidebarContent
                title="Digital Content & Devices"
                items={[
                  "Amazon Music",
                  "Kindle E-readers & Books",
                  "Amazon Appstore",
                ]}
              />
              <SidebarContent
                title="Shop By Department"
                items={["Electronics", "Computers", "Smart Home"]}
              />
              <SidebarContent
                title="Programs & Features"
                items={["Gift Cards", "Amazon live", "International Shopping"]}
              />
              <SidebarContent
                title="Help & Settings"
                items={["Your Account", "Customer Service", "Contact Us", "Sign Out", "Sign In"]}
              />
              <span
                onClick={() => setShowSidebar(false)}
                className="cursor-pointer absolute top-0 left-[82%] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300"
              >
                <CloseIcon />
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
