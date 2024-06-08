import Banner from "../components/home/Banner";
import Products from "../components/home/Products";
export default function Home() {
  return (
    <div>
      <Banner />
     <div className="w-full -mt-10 xl:-mt-24 py-10">
     <Products/>
     </div>
    </div>
  );
}
