import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import {
  getAllBrands,
  getModelsByBrand,
  getCategoriesByBrandAndModel,
} from "../../services/admin.services";
import parts from "../../assets/parts.svg";
import "./FilterInput.css";

export const FilterInput = () => {
  const navigate = useNavigate();

  // Estados para manejar las opciones y selecciones
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Obtener todas las brands al montar el componente
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getAllBrands();
        setBrands(response.data);
      } catch (error) {
        console.error("Error al obtener las brands:", error);
      }
    };
    fetchBrands();
  }, []);

  // Obtener los modelos cuando se selecciona una brand
  useEffect(() => {
    if (selectedBrand) {
      const fetchModels = async () => {
        try {
          const response = await getModelsByBrand(selectedBrand);


          const uniqueModels = [...new Set(response.data.flatMap(item => item.models))];
          console.log(uniqueModels, "uniqueModels")
          setModels(uniqueModels);
        } catch (error) {
          console.error("Error al obtener los modelos:", error);
        }
      };
      fetchModels();
    } else {
      setModels([]);
    }
    setSelectedModel("");
    setSelectedCategory("");
  }, [selectedBrand]);

  // Obtener las categorías cuando se seleccionan brand y model
  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const fetchCategories = async () => {
        try {
          const response = await getCategoriesByBrandAndModel(
            selectedBrand,
            selectedModel
          );
          setCategories(response.data);
        } catch (error) {
          console.error("Error al obtener las categorías:", error);
        }
      };
      fetchCategories();
    } else {
      setCategories([]);
    }
    setSelectedCategory("");
  }, [selectedBrand, selectedModel]);

  // Función para manejar la búsqueda
  const handleSearch = () => {
    navigate(
      `/products/filter?brand=${selectedBrand}&model=${selectedModel}&category_id=${selectedCategory}`
    );
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedCategory("");
  };
console.log(brands, "brands")
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
        <img src={parts} alt="parts icon" /> Buscar partes
      </Col>

      {/* Select de Marca */}
      <Col xs={11} sm={11} md={2} lg={2} xl={2} xxl={2} className="mt-3">
        <select
          className="form-select"
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value);
          }}
        >
          <option value="">Seleccione Marca</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
      </Col>

      {/* Select de Modelo */}
      <Col xs={11} sm={11} md={2} lg={2} xl={2} xxl={2} className="mt-3">
        <select
          className="form-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={!selectedBrand}
        >
          <option value="">Seleccione Modelo</option>
          {models.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
      </Col>

      {/* Select de Categoría */}
      <Col xs={11} sm={11} md={2} lg={2} xl={3} xxl={3} className="mt-3">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={!selectedModel}
        >
          <option value="">Seleccione Categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </Col>

      {/* Botón de búsqueda */}
      <Col className="mt-3 mb-3" xs={11} sm={11} md={2} lg={2} xl={1} xxl={1}>
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
