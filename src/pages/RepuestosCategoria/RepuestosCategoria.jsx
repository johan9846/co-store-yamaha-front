import { useCallback, useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getAllCategorieId } from "../../services/admin.services";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { ProductsCard } from "../../components/ProductsCard/ProductsCard";
import "./RepuestosCategoria.css";

export const RepuestosCategoria = () => {
  const { id } = useParams();
  const [dataCategories, setDataCategories] = useState([]);


  // Productos que tiene la categoria seleccionada 2
  const getCategoriesProducts = useCallback(async (id) => {
    try {
      const { data } = await getAllCategorieId(id);
      console.log(data, "dataaaaa");

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
      <Breadcrumbs aria-label="breadcrumb" className="mt-4">
        <Link underline="hover" href="/home">
          Home
        </Link>
        <Link underline="hover" href="/home/repuestos">
          Repuestos
        </Link>
        <span>{dataCategories[0]?.category.name}</span>
      </Breadcrumbs>

      <Row className="mt-2 mb-4">
        {dataCategories.map((item, key) => (
          <Col
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={3}
            xxl={3}
            className="mt-3"
            key={item.id}
           
          > 
            <ProductsCard product={item} key={key} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
