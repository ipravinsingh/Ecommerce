import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import "./Home.scss";
import Category from "../../components/category/Category";
import Product from "../../components/product/Product";
import { axiosClient } from "../../utils/axiosClient";
import { useSelector } from "react-redux";

function Home() {
  // const [categories, setCategories] = useState(null);
  const categories = useSelector((state) => state.categoryReducer.categories);

  const [topProducts, setTopProducts] = useState(null);

  async function fetchData() {
    // const categoryResponse = await axiosClient.get(
    //   "/categories?populate=image"
    // );
    const topProductsResponse = await axiosClient.get(
      "/products?filters[isTopPick][$eql]=true&populate=image"
    );
    // console.log(categoryResponse);
    // console.log(topProductsResponse);

    // setCategories(categoryResponse.data.data);
    setTopProducts(topProductsResponse.data.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">
            Shop from the best, our File and TV Posters Collection
          </p>
        </div>
        <div className="content">
          {categories?.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </section>
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">All New Designs, Same Old Details</p>
        </div>
        <div className="content">
          {topProducts?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
