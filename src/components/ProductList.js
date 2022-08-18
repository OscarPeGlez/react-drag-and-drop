import React, { useRef } from "react";
import { Container, Grid } from "@mui/material";
import CustomCard from "./CustomCard";
import { useMousePosition } from "../hooks/useMousePosition";

const ProductList = ({ products, setProducts, totalProducts, setTotalProducts }) => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const mousePosition = useMousePosition();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    const dropzone = document.getElementById("car-zone");
    let rect = dropzone.getBoundingClientRect();

    const { x, y } = mousePosition;

    if (y >= 475 || y <= 505) {
      const copyListItems = [...products];
      const dragItemContent = copyListItems[dragItem.current];
      const filterProducts = copyListItems.filter(product => product.id !== dragItemContent.id)
      setTotalProducts(totalProducts +1)
      setProducts(filterProducts);
    }
  };

  return (
    <>
      <Container className="products-container">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <Grid
                  className="grid-item"
                  key={index}
                  xs={12}
                  sm={6}
                  md={3}
                  draggable
                  item
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                >
                  <CustomCard product={product} />
                </Grid>
              );
            })
          ) : (
            <h1>No existen coincidencias</h1>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ProductList;
