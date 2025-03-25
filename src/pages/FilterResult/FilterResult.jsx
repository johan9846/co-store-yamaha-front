import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getFilterProduct } from "../../services/admin.services";
import { useLocation } from "react-router-dom";
import { ProductsCard } from "../../components/ProductsCard/ProductsCard";
import { Container, Row, Col } from "react-bootstrap";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import "./FilterResult.css";
import { InputAdornment, Pagination, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

export const FilterResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Obtener los parámetros de la query string
  const brand = params.get("brand");
  const model = params.get("model");
  const category_id = params.get("category_id");

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const ITEMS_PERPAGE = 10;

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

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  const filteredData = useMemo(() => {
    const filtered = details.filter((file) =>
      file.name?.toLowerCase().includes(searchTerm)
    );

    setCurrentPage(1);
    return filtered;
  }, [searchTerm, details]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PERPAGE;
    const endIndex = startIndex + ITEMS_PERPAGE;
    const filterPage = filteredData.slice(startIndex, endIndex);
    return filterPage;
  }, [currentPage, ITEMS_PERPAGE, filteredData]);

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

      <Row className="mt-2 mb-4">
        <Col xs={8} sm={8} md={6} lg={4} xl={4} xxl={4}>
          <TextField
          
            fullWidth
            variant="outlined"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </Col>
      </Row>

      <Row className="mt-2 mb-4">
        {paginatedData.map((item) => (
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
            <ProductsCard product={item} />
          </Col>
        ))}
      </Row>

      <Row className="mb-4 mt-5">
        <Col>
          <div className="d-flex justify-content-center">
            <Pagination
              count={Math.ceil(filteredData.length / ITEMS_PERPAGE)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
