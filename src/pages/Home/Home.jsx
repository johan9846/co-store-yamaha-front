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
      <Container fluid className="mt-4">
        <Row >
          <Col className="title-home">Explora nuestras categorías</Col>
        </Row>

        <Row className="container-card mt-4 mb-4">
          {categories.map((category, index) => (
            <Col xs={5} sm={5} md={4} lg={4} xl={3} xxl={3} key={index}>
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
