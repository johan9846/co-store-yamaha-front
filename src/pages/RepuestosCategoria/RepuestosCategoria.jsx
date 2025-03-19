import { useCallback, useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getAllCategorieId } from "../../services/admin.services";
import "./RepuestosCategoria.css";
import { ProductsCard } from "../../components/ProductsCard/ProductsCard";

export const RepuestosCategoria = () => {
  const { id } = useParams();
  const [dataCategories, setDataCategories] = useState([]);

  const getCategoriesProducts = useCallback(async (id) => {
    try {
      const { data } = await getAllCategorieId(id);
      console.log(data.data, "dataaaaa")

      if (data) {
        setDataCategories(data);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  }, []);

  useEffect(() => {
    getCategoriesProducts(id);
  }, [getCategoriesProducts]);

  return (
    <Container>
    <Row style={{ border: "2px solid black" }}>
      {dataCategories.map((item, key) => (
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
    </Row>
    </Container>
  );
};
