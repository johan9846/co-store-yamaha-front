import React, { useState, useCallback, useRef, useEffect } from "react";
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
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 575px)");

  // Función de búsqueda con debounce de 500ms
  const handleSearch = useCallback(
    debounce(async (value) => {
      if (value.trim().length >= 3) {
        setIsLoading(true);
        try {
          const { data } = await getSearchProduct(value);

          const filterData = data.filter(
            (product) => product.category?.status === "Activo"
          );

          setFilteredProducts(filterData);
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
      navigate(`/home/repuestos/product/${product.id}`);
    }
    setOpen(false);
    setSearch(product?.name || "");
  };

  const handleClose = () => {
    setOpen(false);
    setSearch("");
    setIsFocused(false);

    // Retrasar el blur para evitar que Autocomplete recupere el foco
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }, 500);
  };

  return (
    <div>
      {/* Fondo oscuro cuando hay resultados */}
      <div className={isFocused ? "container-input-search" : ""}>
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",

              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px", // Grosor del borde por defecto
              },

              width:
                isFocused && isMobile ? "80vw" : isFocused ? "50vw" : "100%",
            },
          }}
          className={`search-input ${isFocused ? "search-input-top" : ""}`}
          onFocus={() => setIsFocused(true)}
          options={filteredProducts}
          open={open}
          loading={isLoading}
          onInputChange={handleInputChange}
          onChange={handleDetails}
          inputValue={search}
          onBlur={() => {
            setOpen(false);
            setIsFocused(false);
          }}
          onClose={() => {
            setOpen(false);
            setIsFocused(false);
          }}
          noOptionsText="No hay opciones disponibles"
          loadingText="Cargando opciones..."
          getOptionLabel={(option) => option.name || ""}
          filterOptions={(x) => x} // No filtramos, mostramos todo lo que llega
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              inputRef={inputRef} // Asigna la referencia aquí
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
                  {product.brands.map((brand) => brand.name).join(", ")} -{" "}
                  {product.brands
                    .map((brand) => brand.models.join(", "))
                    .join(" | ")}
                </div>
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  paddingLeft: "20px",
                }}
              >
                ${product.price}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default InputSearch;
