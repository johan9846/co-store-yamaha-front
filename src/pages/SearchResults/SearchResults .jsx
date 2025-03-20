import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useProductStore } from "../../store/use-product-store";
import { ProductsCard } from "../../components/ProductsCard/ProductsCard";

export const SearchResults = () => {
  const { products } = useProductStore();
  const location = useLocation();

  // Obtener parámetros de la URL
  const params = new URLSearchParams(location.search);
  const brand = params.get("brand");
  const model = params.get("model");
  const category = params.get("category");

  // Filtrar productos según la búsqueda
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) => p.brand === brand && p.model === model && p.category === category
    );
  }, [brand, model, category, products]);

  return (
    <Container>
      <h2>Resultados de Búsqueda</h2>
      ajkdfhasjkdhasjashdjkasdhjkadhajkdhadjk
      <Row style={{ border: "2px solid black" }} className="mt-4">
        {filteredProducts.map((item) => (
          <Col xs={12} sm={10} md={4} lg={4} xl={3} xxl={3} className="px-3" key={item.id}>
            <ProductsCard product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
