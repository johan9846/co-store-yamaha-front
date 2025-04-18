import LogoLight from "../../assets/LogoLight.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/use-cart-store";
import { Container, Row, Col } from "react-bootstrap";
import { FilterInput } from "../FilterInput/FilterInput";
import InputSearch from "../InputSearch/InputSearch";
import { Badge } from "@mui/material";
import "./Header.css";


export const Header = () => {
  const { productData, darkMode, toggleTheme } = useCartStore();


  return (
    <Container fluid className="header-container">
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="mb-2 mb-md-0"
        >
          <Row className="items-cart">
            <Col
              xs={12}
              sm={3}
              md={3}
              lg={4}
              xl={4}
              xxl={4}
              className="logo-header"
            >
              <Link to="/home">
                <div>
                  <img src={LogoLight} alt="LogoLight" />
                </div>
              </Link>
            </Col>

            <Col xs={9} sm={7} md={6} lg={5} xl={6} xxl={6}>
              <InputSearch />
            </Col>

            <Col
              xs={3}
              sm={2}
              md={3}
              lg={3}
              xl={2}
              xxl={2}
              className="items-header"
            >
              <Link to={"/home"}>Home</Link>
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
                  <ShoppingCartIcon
                    sx={{ color: darkMode ? "white":"black"   }}
                  />
                </Badge>
              </Link>

              <button
                onClick={toggleTheme}
                className="btn-theme-toggle"
                style={{
                  marginTop: "8px",
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  background: "transparent",
                  color: "var(--text)",
                  cursor: "pointer",
                }}
              >
                {darkMode ? "Modo Claro" : "Modo Oscuro"}
              </button>
            </Col>
          </Row>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <FilterInput />
        </Col>
      </Row>
    </Container>
  );
};
