import React, { useState, useMemo } from "react";
import { useProductStore } from "../../store/use-product-store";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  TextField,
  InputAdornment,
  Avatar,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./InputSearch.css"; // Estilos

const InputSearch = () => {
  const { products } = useProductStore();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false); // Estado para manejar apertura de la lista
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const filteredProducts = useMemo(() => {
    if (search.trim().length < 3) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const handleSearch = (event, value) => {
    setSearch(value);
    setOpen(value.trim().length >= 3 && filteredProducts.length > 0);
  };

  const handleDetails = (event, product) => {
    if (!product) return;
    
    navigate(`/product/${product.id}`, {
      state: { item: product },
    });

    setOpen(false); // Cerrar la lista después de seleccionar
    setSearch("");
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
          open={open} // Controlar apertura manualmente
          onInputChange={handleSearch}
          onChange={handleDetails}
          inputValue={search}
          onBlur={() => setOpen(false)} // Cerrar la lista si se pierde el foco
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Buscar producto..."
              className={isMobile ? "textFieldMobile" : "textField"}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClose}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoFocus
            />
          )}
          renderOption={(props, product, state) => (
            <li {...props} className={`listItem ${props.className}`} key={product.id} style={{ display: 'flex', padding: '10px 20px', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
            {/*   <div style={{ fontWeight: 'bold', marginRight: '8px' }}>{state.index + 1}.</div> */}
              <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
              <div style={{ marginLeft: '12px', flexGrow: 1, paddingRight:"10px" }}>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{product.name}</div>
                <div style={{ fontSize: '12px', color: '#777' }}>
                  {product.brand} - {product.model}
                </div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                ${product.price}
              </div>
            </li>
          )}
          
          
        />
      )}
    </div>
  );
};

export default InputSearch;
