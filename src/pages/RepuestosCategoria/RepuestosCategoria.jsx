import { useCallback, useEffect, useMemo, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getAllCategorieId } from "../../services/admin.services";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { ProductsCard } from "../../components/ProductsCard/ProductsCard";
import "./RepuestosCategoria.css";
import { InputAdornment, Pagination, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

export const RepuestosCategoria = () => {
  const { id } = useParams();
  const [dataCategories, setDataCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const ITEMS_PERPAGE = 10;

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
  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  const filteredData = useMemo(() => {
    const filtered = dataCategories.filter((file) =>
      file.name?.toLowerCase().includes(searchTerm)
    );

    setCurrentPage(1);
    return filtered;
  }, [searchTerm, dataCategories]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PERPAGE;
    const endIndex = startIndex + ITEMS_PERPAGE;
    const filterPage = filteredData.slice(startIndex, endIndex);
    return filterPage;
  }, [currentPage, ITEMS_PERPAGE, filteredData]);

  return (
    <Container className="px-3">
      <Row className="mt-2 mb-4">
        <Col>
          <Breadcrumbs aria-label="breadcrumb" className="mt-4">
            <Link underline="hover" href="/home">
              Home
            </Link>
            <Link underline="hover" href="/home/repuestos">
              Repuestos
            </Link>
            <span>{dataCategories[0]?.category.name}</span>
          </Breadcrumbs>
        </Col>
      </Row>

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
        {paginatedData.map((item, key) => (
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
