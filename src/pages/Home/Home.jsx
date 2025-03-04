import { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";
import { ProductsCard } from "../../components/ProductsCard/ProductsCard";
import { Container, Row, Col } from "react-bootstrap";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    setProducts(data.data);
  }, [data]);

  return (
    <Container style={{border:"2px solid blue"}}>
      <Row style={{border:"2px solid black"}}>
        {products.map((item, key) => (
          <Col xs={6} sm={6} md={4} lg={4} xl={3} xxl={3} className="px-3">
            <ProductsCard product={item} key={key} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
