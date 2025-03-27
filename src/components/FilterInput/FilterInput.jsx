import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap";
import {
  getAllBrands,
  getModelsByBrand,
  getCategoriesByBrandAndModel,
} from "../../services/admin.services";
import parts from "../../assets/parts.svg";
import CloseIcon from "@mui/icons-material/Close";
import "./FilterInput.css";
import { useMediaQuery } from "@mui/material";

export const FilterInput = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Estados para manejar las opciones y selecciones
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [openMobile, setOpenMobile] = useState(false);

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

          const uniqueModels = [
            ...new Set(response.data.flatMap((item) => item.models)),
          ];

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
          const { data } = await getCategoriesByBrandAndModel(
            selectedBrand,
            selectedModel
          );
          console.log(data, "responsee");
          const filterData = data.filter(
            (category) => category.status === "Activo"
          );
          setCategories(filterData);
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
    setOpenMobile(false)
  };

  return (
    <Row className="container-filter-input">
      <Col
        xs={11}
        sm={11}
        md={4}
        lg={3}
        xl={2}
        xxl={2}
        className="icon-filter"
      >
        <div onClick={() => setOpenMobile(true)}>
          <img src={parts} alt="parts icon" />  Buscar partes
        </div>
      </Col>

      {(isDesktop || openMobile) && (
        <>
          {openMobile && !isDesktop && (
            <Col xs={11} sm={11} className="icon-close">
              <CloseIcon
                onClick={() => setOpenMobile(false)}
                sx={{ cursor: "pointer", color: "white" }}
              />
            </Col>
          )}
          <Col xs={11} sm={11} md={2} lg={2} xl={2} xxl={2} className="container-form-select">
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

          <Col xs={11} sm={11} md={2} lg={2} xl={2} xxl={2} className="container-form-select">
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

          <Col xs={11} sm={11} md={2} lg={2} xl={3} xxl={3} className="container-form-select">
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

          <Col xs={11} sm={11} md={2} lg={2} xl={1} xxl={1} className="container-form-select-button" >
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
        </>
      )}
    </Row>
  );
};
