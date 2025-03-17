import LogoLight from "../../assets/LogoLight.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/use-cart-store";
import { Container, Row, Col } from "react-bootstrap";
import { FilterInput } from "../FilterInput/FilterInput";
import InputSearch from "../InputSearch/InputSearch";
import { Badge } from "@mui/material";
import "./Header.css";


export const Header = ({ data }) => {

  const { productData} = useCartStore();
  return (
    <Container className="header-container">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Row className="items-cart">
            <Col
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              xxl={4}
              className="logo-header"
            >
              <Link to="/">
                <div>
                  <img src={LogoLight} alt="LogoLight" />
                </div>
              </Link>
            </Col>

            <Col xs={4} sm={4} md={4} lg={5} xl={6} xxl={6}>
              <InputSearch />
            </Col>

            <Col
              xs={4}
              sm={4}
              md={4}
              lg={3}
              xl={2}
              xxl={2}
              className="items-header"
            >
              <Link to={"/"}>Home</Link>
              <Link to="/cart">
                <Badge
                  badgeContent={productData.length}
                  color="primary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "10px", // Tamaño del texto del badge
                      height: "16px", // Altura del badge
                      minWidth: "16px", // Ancho mínimo del badge
                      padding: "0 4px", // Ajuste de padding interno
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </Col>
          </Row>
        </Col>

        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="filter-input"
        >
          <FilterInput data={data} />
        </Col>
      </Row>
    </Container>
  );
};
