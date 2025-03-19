import { useCallback, useEffect, useState } from "react";
import { ProductsCard } from "../../components/ProductsCard/ProductsCard";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logoHome from "../../assets/image-home.webp";

import motor from "../../assets/motor.webp";
import elect from "../../assets/elect.webp";
import kit from "../../assets/kit.webp";
import llantas from "../../assets/llantas.webp";
import { getAllCategories } from "../../services/admin.services";

import "./Repuestos.css";

export const Repuestos = ({ data }) => {
  const [dataCategories, setDataCategories] = useState([]);
  const navigate = useNavigate(); // Hook para navegar

  // Mapeo de imágenes según el nombre de la categoría
  const categoryImages = {
    "Partes de Motor": motor,
    "Partes Eléctricas": elect,
    "Kit de Arrastre": kit,
    "Llantas": llantas
  };

  const getCategories = useCallback(async () => {
    try {
      const { data } = await getAllCategories();
      if (data) {
        const sortedData = data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .filter((category) => category.status === "Activo");
        setDataCategories(sortedData);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleCategoryClick = (categoryId) => {
    // Navegamos a la ruta correspondiente cuando se selecciona una categoría
    navigate(`/repuestos/${categoryId}`);
  };

  return (
    <>
      <img src={logoHome} className="image-repuestos" />
      <Container className="mt-4">
        <Row>
          <Col className="title-repuestos">Repuestos</Col>
        </Row>

        <div className="container-option mt-3 mb-5">
          {dataCategories.map((item, key) => (
            <div className="option-category" key={key}>
              <div>
                <img
                  src={categoryImages[item.name]} // Mostrar imagen correspondiente o imagen por defecto
                  alt={item.name}
                  className="image-option" // Ajusta el tamaño según necesidad
                  onClick={() => handleCategoryClick(item.id)}
                />
              </div>
              <div>{item.name}</div>
            </div>
          ))}
        </div>

      
      </Container>
    </>
  );
};







{/*   <Row style={{ border: "2px solid black" }}>
          {data.map((item, key) => (
            <Col
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={3}
              xxl={3}
              className="px-3 mt-4"
              key={item.id}
              style={{ border: "2px solid green" }}
            >
              <ProductsCard product={item} key={key} />
            </Col>
          ))}
        </Row> */}