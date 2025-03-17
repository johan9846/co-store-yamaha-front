import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import parts from "../../assets/parts.svg";
import "./FilterInput.css";

export const FilterInput = ({ data }) => {
  const navigate = useNavigate();

  // Estados para los filtros
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Obtener marcas únicas
  const brands = useMemo(() => {
    return [...new Set(data.map((p) => p.brand))];
  }, [data]);

  // Obtener modelos únicos según la marca seleccionada
  const models = useMemo(() => {
    return selectedBrand
      ? [
          ...new Set(
            data.filter((p) => p.brand === selectedBrand).map((p) => p.model)
          ),
        ]
      : [];
  }, [selectedBrand, data]);

  // Obtener categorías únicas según marca y modelo seleccionados
  const categories = useMemo(() => {
    return selectedBrand && selectedModel
      ? data
          .filter((p) => p.brand === selectedBrand && p.model === selectedModel)
          .map((p) => p.category) // Extraemos el objeto completo de categoría
          .filter(
            (value, index, self) =>
              index === self.findIndex((cat) => cat.id === value.id)
          ) // Filtrar duplicados basados en el id de la categoría
      : [];
  }, [selectedBrand, selectedModel, data]);

  // Función para manejar la búsqueda
  const handleSearch = () => {
    navigate(
      `/products/filter?brand=${selectedBrand}&model=${selectedModel}&category_id=${selectedCategory}`
    );
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedCategory("");
  };

  return (
    <Row style={{ width: "100%" }} className="d-flex justify-content-center">
      <Col
        xs={11}
        sm={11}
        md={3}
        lg={2}
        xl={2}
        xxl={2}
        className="icon-filter mt-3 mt-md-0"
      >
        <img src={parts} alt="" /> Buscar partes
      </Col>

      <Col xs={11} sm={11} md={2} lg={2} xl={2} xxl={2} className="mt-3">
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
          <option value="">Seleccione Marca</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </Col>

      <Col xs={11} sm={11} md={2} lg={2} xl={2} xxl={2} className="mt-3">
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
          <option value="">Seleccione Modelo</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </Col>

      <Col xs={11} sm={11} md={2} lg={2} xl={3} xxl={3} className="mt-3">
        {/* Select de Categoría */}

        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={!selectedBrand || !selectedModel}
        >
          <option value="">Seleccione Categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </Col>

      <Col className=" mt-3 mb-3" xs={11} sm={11} md={2} lg={2} xl={1} xxl={1}>
        {/* Botón de búsqueda */}
        <Button
          onClick={handleSearch}
          disabled={!selectedBrand || !selectedModel || !selectedCategory}
          style={{
            backgroundColor:
              !selectedBrand || !selectedModel || !selectedCategory
                ? "#b0bec5"
                : "#CEFD12",
            color: "black",
            width: "100%",
          }}
        >
          Buscar
        </Button>
      </Col>
    </Row>
  );
};
