import React, { useCallback, useEffect, useState } from "react";
import { getFilterProduct } from "../../services/admin.services";
import { useLocation } from "react-router-dom";
import { ProductsCard } from "../../components/ProductsCard/ProductsCard";
import { Container, Row, Col } from "react-bootstrap";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import "./FilterResult.css";

export const FilterResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Obtener los parámetros de la query string
  const brand = params.get("brand");
  const model = params.get("model");
  const category_id = params.get("category_id");

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductFilter = useCallback(async (brand, model, category_id) => {
    try {
      const { data } = await getFilterProduct(brand, model, category_id);
      console.log(data, "filterResult");
      setDetails(data);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProductFilter(brand, model, category_id);
  }, [brand, model, category_id, getProductFilter]);

  if (loading) return <p>Cargando...</p>;

  return (
    <Container className="mt-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" href="/home">
          Home
        </Link>
        <Link underline="hover" href="/home/repuestos">
          Repuestos
        </Link>
        <span>{details[0]?.category.name}</span>
      </Breadcrumbs>

      <Row style={{ border: "2px solid black" }}>
        {details.map((item) => (
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
            <ProductsCard product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
