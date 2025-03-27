import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logoHome from "../../assets/image-home.webp";
import repuestos from "../../assets/repuestos.webp";
import moda from "../../assets/moda.jpg";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Repuestos", image: repuestos, path: "/home/repuestos" },
    { name: "Moda", image: moda, path: "/home/moda" },
  ];

  return (
    <>
      <img src={logoHome} className="image-banner" />
      <Container fluid className="mt-4 mb-5">
        <Row >
          <Col className="title-home mb-4">Explora nuestras categorías</Col>
        </Row>

        <Row className="container-card mt-4 mb-4">
          {categories.map((category, index) => (
            <Col xs={6} sm={6} md={5} lg={5} xl={3} xxl={3} key={index} className="d-flex justify-content-center" >
              <div
                className="tarjet-home"
                style={{ backgroundImage: `url(${category.image})` }}
                onClick={() => navigate(category.path)} // Navegación correcta
              >
                <div className="text-home">{category.name}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
