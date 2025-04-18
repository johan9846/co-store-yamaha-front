import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


import { getSearchProduct } from "../../services/admin.services";
import debounce from "debounce";
import "./InputSearch.css";
import { useCartStore } from "../../store/use-cart-store";

const InputSearch = () => {
  const { darkMode } = useCartStore();

  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
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
    if (reason === "input") {
      handleSearch(value);
      if (value.length > 0) {
        setIsFocused(true);
      } else {
        setIsFocused(false);
      }
    }
  };

  const handleDetails = (event, product) => {
    if (product) {
      navigate(`/home/repuestos/product/${product.id}`);
    }
    setOpen(false);
  };

  const formatCurrency = (value) =>
    `${Number(value || 0).toLocaleString("es-CO")}`;
  return (
    <div>
      {/* Fondo oscuro cuando hay resultados */}
      <div className={isFocused ? "container-input-search" : ""}>
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: darkMode ? "#1e1e1e" : "#fff",
              color: darkMode ? "#fff" : "#000",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: darkMode ? "#555" : "#ccc",
                borderWidth: "2px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: darkMode ? "#888" : "#000",
              },
              width:
                isFocused && isMobile ? "80vw" : isFocused ? "50vw" : "100%",
            },
            "& .MuiAutocomplete-popupIndicator": {
              display: "none !important",
            },
            "& .MuiInputBase-input": {
              color: darkMode ? "#fff" : "#000",
            },
            "& .MuiSvgIcon-root": {
              color: darkMode ? "#aaa" : "#333",
            },
          }}
          className={`search-input ${isFocused ? "search-input-top" : ""}`}
          options={filteredProducts}
          open={open}
          loading={isLoading}
          onInputChange={handleInputChange}
          onChange={handleDetails}
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
                $ {formatCurrency(product.price)}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default InputSearch;
