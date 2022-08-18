import LoadingButton from "@mui/lab/LoadingButton";
import * as React from "react";
import { fetchProducts } from "./api/fetchProducts";

import "./App.css";
import CustomCar from "./components/CustomCar";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

export default function SearchAppBar() {
  const [products, setProducts] = React.useState([]);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [isLoading, setIsloading] = React.useState(false);
  const [datafetch, setDataFetch] = React.useState(null);

  console.log(datafetch)

  const getProducts = () => {
    const newDataFetch = { criterio: datafetch.criterio, page: datafetch.page + 1 }
    setDataFetch(newDataFetch)
    fetchProducts(datafetch, setIsloading, setProducts)
  }

  return (
    <>
      <Header setDataFetch={setDataFetch} setProducts={setProducts} />
      <CustomCar totalProducts={totalProducts} />
      <div style={{ width: 100, marginLeft: "auto", marginTop: 40 }}>
        <LoadingButton
          size="small"
          onClick={() => getProducts()}
          loading={isLoading}
          disabled={!products.length}
          variant="contained"
        >
          Next Page
        </LoadingButton>
      </div>
      <ProductList
        products={products}
        setProducts={setProducts}
        totalProducts={totalProducts}
        setTotalProducts={setTotalProducts}
      />
    </>
  );
}
