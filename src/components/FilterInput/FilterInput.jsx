import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useProductStore } from "../../store/use-product-store";

export const FilterInput = () => {
  const { products } = useProductStore();
  const navigate = useNavigate();

  // Estados para los filtros
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Obtener marcas únicas
  const brands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))];
  }, [products]);

  // Obtener modelos únicos según la marca seleccionada
  const models = useMemo(() => {
    return selectedBrand
      ? [
          ...new Set(
            products
              .filter((p) => p.brand === selectedBrand)
              .map((p) => p.model)
          ),
        ]
      : [];
  }, [selectedBrand, products]);

  // Obtener categorías únicas según marca y modelo seleccionados
  const categories = useMemo(() => {
    return selectedBrand && selectedModel
      ? [
          ...new Set(
            products
              .filter(
                (p) => p.brand === selectedBrand && p.model === selectedModel
              )
              .map((p) => p.category)
          ),
        ]
      : [];
  }, [selectedBrand, selectedModel, products]);

  // Función para manejar la búsqueda
  const handleSearch = () => {
    navigate(
      `/search?brand=${selectedBrand}&model=${selectedModel}&category=${selectedCategory}`
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          {/* Select de Marca */}

          <select
            className="form-select"
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setSelectedModel(""); // Resetear modelo al cambiar marca
              setSelectedCategory(""); // Resetear categoría
            }}
          >
            <option value="">Seleccione una marca</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </Col>

        <Col>
          {/* Select de Modelo */}

          <select
            className="form-select"
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setSelectedCategory(""); // Resetear categoría
            }}
            disabled={!selectedBrand}
          >
            <option value="">Seleccione un modelo</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </Col>

        <Col>
          {/* Select de Categoría */}

          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={!selectedBrand || !selectedModel}
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Col>

        <Col className="d-flex align-items-center">
          {/* Botón de búsqueda */}
          <Button
            variant="contained"
            
            onClick={handleSearch}
            disabled={!selectedBrand || !selectedModel || !selectedCategory}
            style={{
              backgroundColor:
                !selectedBrand || !selectedModel || !selectedCategory
                  ? "#b0bec5"
                  : "#1976d2",
              color: "white",
            }}
          >
            Buscar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
