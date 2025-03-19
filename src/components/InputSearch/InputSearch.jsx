import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { getSearchProduct } from "../../services/admin.services";
import debounce from "debounce";
import "./InputSearch.css";

const InputSearch = () => {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Función de búsqueda con debounce de 500ms
  const handleSearch = useCallback(
    debounce(async (value) => {
      if (value.trim().length >= 3) {
        setIsLoading(true);
        try {
          const response = await getSearchProduct(value);
          setFilteredProducts(response.data);
          setOpen(true);
        } catch (error) {
          console.error("Error al buscar productos:", error);
          setFilteredProducts([]);
          setOpen(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFilteredProducts([]);
        setOpen(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (event, value, reason) => {
    setSearch(value);

    if (reason === "input") {
      handleSearch(value);
    }
  };

  const handleDetails = (event, product) => {
    if (product) {
      navigate(`/product/${product.id}`);
    }
    setOpen(false);
    setSearch(product?.name || "");
  };

  const handleClose = () => {
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="container">
      {isMobile && !openSearch ? (
        <div className="searchIcon" onClick={() => setOpenSearch(true)}>
          <SearchIcon /> <span>Buscar</span>
        </div>
      ) : (
        <Autocomplete
          options={filteredProducts}
          getOptionLabel={(option) => option.name}
          open={open}
          loading={isLoading} // Loader mientras se cargan las opciones
          className={isMobile ? "textFieldMobile" : "textField"}
          onInputChange={handleInputChange}
          onChange={handleDetails}
          inputValue={search}
          onBlur={() => setOpen(false)}
          onClose={() => setOpen(false)}
          noOptionsText="No hay opciones disponibles"
          loadingText="Cargando opciones..." // Mensaje personalizado mientras carga
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Buscar producto..."
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClose}>
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
              autoFocus
            />
          )}
          renderOption={(props, product) => (
            <div
              {...props}
              key={product.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 20px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "4px",
                  objectFit: "cover",
                }}
              />
              <div style={{ marginLeft: "12px", flexGrow: 1 }}>
                <div style={{ fontWeight: "500" }}>{product.name}</div>
                <div style={{ fontSize: "12px", color: "#777" }}>
                  {product.brand} - {product.model}
                </div>
              </div>
              <div style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                ${product.price}
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default InputSearch;
