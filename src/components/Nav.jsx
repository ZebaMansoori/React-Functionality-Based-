import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  // Change this line based on your context structure:
  const [products] = useContext(ProductContext); // Or use { products }

  const distinct_category = products
    ? [...new Set(products.map((p) => p.category))]
    : [];

  return (
    <nav className='w-[15%] h-full bg-zinc-200 flex flex-col pt-5 items-center'>
      <Link
        to="/create"
        className='px-5 py-2 border rounded border-blue-200 text-blue-300'
      >
        Add New Product
      </Link>
      <hr className='w-[80%] my-3' />
      <h1 className='text-2xl mb-3 w-[80%]'>Category Filter</h1>
      <div className='w-[80%]'>
        {distinct_category.length > 0 ? (
          distinct_category.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category}`}
              className='flex items-center mb-3'
            >
              <span className='rounded-full mr-2 w-[15px] h-[15px] bg-blue-900'></span>
              {category}
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No categories found.</p>
        )}
      </div>
    </nav>
  );
};

export default Nav;
