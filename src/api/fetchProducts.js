export const fetchProducts = (data, setIsloading, setProducts) => {
  const { page, criterio } = data;

  setIsloading(true);
  fetch(
    `https://00672285.us-south.apigw.appdomain.cloud/demo-gapsi/search?&query=${criterio}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-IBM-Client-Id": "adb8204d-d574-4394-8c1a-53226a40876e",
      },
    }
  )
    .then((res) => {
      setIsloading(false);
      res
        .json()
        .then((response) => {
          const {
            props: {
              pageProps: { initialData: data },
            },
          } = response.item;
          if (data) {
            const {
              searchResult: { itemStacks },
            } = data;
            const items = itemStacks[0].items;
            setProducts(
              items.map((item) => {
                return {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  price: item.price,
                  image: item.image,
                };
              })
            );
          }
          setIsloading(false);
        })
        .catch((error) => {
          setIsloading(false);
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      setIsloading(false);
      console.error("Error:", error);
    });
};
