import LogoLight from "../../assets/LogoLight.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/use-cart-store";
import { Container, Row, Col } from "react-bootstrap";
import { FilterInput } from "../FilterInput/FilterInput";
import "./Header.css";

export const Header = () => {
  const { productData, UserInfo } = useCartStore();

 

  return (
    <Container className="header-container">
      <Row >
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}  className="items-cart">
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
        </Col>

        <Col  className="mt-2">
          <FilterInput />
        </Col>
      </Row>
    </Container>
  );
};
