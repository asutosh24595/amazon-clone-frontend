import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { amazonSliceActions } from "../../store/AmazonSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function SidebarContent({ title, items }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector(state=>state.amazon.userInfo);

  const auth = getAuth();

  return (
    <div className="py-3 border-b-[1px] border-b-gray-300">
      <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">
        {title}
      </h3>
      <ul className="text-sm">
        <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
          {items[0]}
          <span>
            <KeyboardArrowRightIcon />
          </span>
        </li>
        <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
          {items[1]}
          <span>
            <KeyboardArrowRightIcon />
          </span>
        </li>
        <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
          {items[2]}
          <span>
            <KeyboardArrowRightIcon />
          </span>
        </li>
        <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
          <button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  dispatch(amazonSliceActions.userLogOut());
                  navigate("/signin");
                })
                .catch((error) => {
                    console.log(error);
                });
            }}
          >
            {userData.userName ? items[3] : items[4]}
          </button>
        </li>
      </ul>
    </div>
  );
}
