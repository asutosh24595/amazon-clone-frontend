import { useLoaderData } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { amazonSliceActions } from "../../store/AmazonSlice";

export default function Products() {
  const data = useLoaderData();

  const cart = useSelector((state) => state.amazon.items);

  const dispatch = useDispatch();

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 px-4">
      {data.map((item) => {
        const isInCart = cart.find((cartItem) => cartItem.id === item.id);
        return (
          <div
            key={item.id}
            className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30 
                hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
          >
            <div className="w-full h-auto flex items-center justify-center">
              <img
                className="w-52 h-64 object-contain"
                src={item.image}
                alt="productImg"
              />
              <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
                {item.category}
              </span>
            </div>
            <div className="px-4">
              <div className="flex items-center justify-between">
                <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                  {item.title.substring(0, 20)}
                </h2>
                <p className="text-sm text-gray-600 font-semibold">
                  ${item.price}
                </p>
              </div>
              <div>
                <p className="text-sm mb-2">
                  {item.description.substring(0, 100)}...
                </p>
              </div>
              <div className="text-yellow-500">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <button
              onClick={() =>
                !isInCart &&
                dispatch(
                  amazonSliceActions.addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    quantity: 1,
                  })
                )
              }
              disabled={isInCart}
              className={`w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border 
              ${
                isInCart
                  ? "cursor-not-allowed opacity-50"
                  : "hover:from-yellow-300 hover:to-yellow-400 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500"
              } 
              border-yellow-500 duration-200 py-1.5 rounded-md mt-3`}
            >
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
