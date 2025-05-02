import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import Nav from "./Nav";
import Loading from "./Loading";

function Home() {
  const { categoryName } = useParams();
  const [products] = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Make sure products are available before filtering
    if (products && products.length > 0) {
      if (!categoryName) {
        setFilteredProducts(products); // No category, show all products
      } else {
        const filtered = products.filter(
          (product) =>
            product.category.toLowerCase() === categoryName.toLowerCase()
        );
        setFilteredProducts(filtered);
      }
    }
  }, [categoryName, products]);

  // Show loading if products are not yet loaded or empty
  if (products === null || products.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <Nav />
      <div className="p-10 pt-[5%] w-[85%] h-full overflow-y-auto flex flex-wrap">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`}
              className="mr-3 mb-3 p-3 border shadow rounded w-[18%] h-[30vh] flex flex-col justify-center items-center transition-transform hover:scale-105"
            >
              <div
                className="w-full mb-3 bg-contain bg-no-repeat bg-center h-[80%]"
                style={{ backgroundImage: `url(${p.image})` }}
              ></div>
              <h1 className="text-center hover:text-blue-400">{p.title}</h1>
            </Link>
          ))
        ) : (
          <h1 className="text-2xl text-center text-red-400 w-full">
            No Products Found 🚫
          </h1>
        )}
      </div>
    </>
  );
}

export default Home;
