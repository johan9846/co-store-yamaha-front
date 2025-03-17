import { useCallback, useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";
import { ProductsCard } from "../../components/ProductsCard/ProductsCard";
import { Container, Row, Col } from "react-bootstrap";
import { useProductStore } from "../../store/use-product-store";



export const Home = ({data}) => {

/*   const [products, setProducts] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    setProducts(data);
  }, [data]);
 */

  return (
    <Container className="mt-4">
      <Row style={{border:"2px solid black"}} >
        {data.map((item, key) => (
          <Col xs={12} sm={12} md={4} lg={4} xl={3} xxl={3} className="px-3 mt-4"  key={item.id} style={{border:"2px solid green"}} >
            <ProductsCard product={item} key={key} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
