import LogoLight from "../../assets/LogoLight.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/use-cart-store";
import "./Header.css";

export const Header = () => {
  const { productData, UserInfo } = useCartStore();

  console.log(UserInfo);

  return (
   
      <div className="header-container">
        <div className="logo-header">
          <Link to="/">
            <div>
              <img src={LogoLight} alt="LogoLight" className="w-28" />
            </div>
          </Link>
        </div>

        <div className="items-header">
          <Link to={"/"}>Home</Link>
          <Link to="/cart">
            <ShoppingCartIcon />
            <span> {productData.length}</span>
           
          </Link>
        </div>
      </div>

  );
};
