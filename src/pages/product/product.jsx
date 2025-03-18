import React, { useCallback, useEffect, useState } from "react";

import { getAllProductId } from "../../services/admin.services";
import { useParams } from "react-router-dom";
import { DetailProduct } from "../../components/DetailProduct/DetailProduct";
import "./product.css";

export const Product = () => {
  const { id } = useParams();

  const [details, setDetails] = useState([]);

  const [loading, setLoading] = useState(true);

  const getProdctId = useCallback(async (id) => {
    try {
      const { data } = await getAllProductId(id);
      console.log(data);
      if (data) {
        setDetails(data);
      }
    } catch (error) {
      console.error("Error fetching :", error);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencias necesarias

  useEffect(() => {
    getProdctId(id);
  }, [getProdctId, id]);

  if (loading) return <p>Cargando...</p>;
  return (
    <>
      <DetailProduct details={details} />
    </>
  );
};
