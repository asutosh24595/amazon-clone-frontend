import FooterBottom from "./FooterBottom";
import FooterMiddle from "./FooterMiddle";
import FooterTop from "./FooterTop";
import { useSelector } from "react-redux";

export default function Footer() {
  const userData = useSelector((state) => state.amazon.userInfo);

  return (
    <div className="font-titleFont">
      {userData ? <></> : <FooterTop />}
      <FooterMiddle />
      <FooterBottom />
    </div>
  );
}
