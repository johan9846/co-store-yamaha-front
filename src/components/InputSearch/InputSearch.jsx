import React, { useState } from "react";
import { useProductStore } from "../../store/use-product-store";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Row, Col } from "react-bootstrap";
import "./InputSearch.css"; // Importamos los estilos

const InputSearch = () => {
  const { products } = useProductStore();
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    setFilteredProducts(
      value.trim()
        ? products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleDetails = (product) => {
    navigate(`/product/${product.name.toLowerCase().split(" ").join("")}`, {
      state: { item: product },
    });
    setSearch("");
    setFilteredProducts([]);
  };

  const handleClose = () => {
    setOpenSearch(false);
    setSearch("");
    setFilteredProducts([]);
  };

  return (
    
    <div className="container">
      {isMobile && !openSearch ? (
        <div className="searchIcon" onClick={() => setOpenSearch(true)}>
          <SearchIcon /> <span>Buscar</span>
        </div>
      ) : (
        <TextField
          variant="outlined"
          placeholder="Buscar producto..."
          value={search}
          onChange={handleSearch}
          className={isMobile ? "textFieldMobile" : "textField"}
          InputProps={{
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

      {filteredProducts.length > 0 && (
        <Paper elevation={3} className="productList">
          <List>
            {filteredProducts.map((product) => (
              <ListItem
                button
                key={product.id}
                onClick={() => handleDetails(product)}
                className="listItem"
              >
                <ListItemAvatar>
                  <Avatar src={product.image} alt={product.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={
                    <Box className="secondaryText">
                      <Typography variant="body2" color="textSecondary">
                        {product.brand} - {product.model}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        ${product.price}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default InputSearch;
