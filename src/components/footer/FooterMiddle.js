import FooterMidListItem from "./FooterMidListItem";
import { footerMidListItems } from "../../constants/data";
import logo from "../../assets/logo.png";
import indFlag from "../../assets/indiaFlag.png";

export default function FooterMiddle() {
  return (
    <div>
      <a href="#header">
        <div className="w-full h-12 bg-gray-700 text-center flex items-center justify-center hover:bg-gray-600 text-sm text-white">
          <h1>Back to top</h1>
        </div>
      </a>
      <div className="w-full bg-amazon_light text-white">
        <div className="w-full border-b-[1px] border-gray-500 p-10">
          <div className="max-w-5xl mx-auto text-gray-300">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-4 gap-6 md:place-items-center md:items-start">
              {footerMidListItems.map((list) => (
                <FooterMidListItem
                  key={list.id}
                  title={list.title}
                  itemsList={list.listItems}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex gap-6 items-center justify-center py-6">
          <div>
            <img className="w-20 pt-3 " src={logo} alt="amznlogo" />
          </div>
          <div className="flex gap-2">
            <p className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
              English
            </p>
          </div>
          <div className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
            <img className="w-6" src={indFlag} alt="indflag" />
            <p>India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
