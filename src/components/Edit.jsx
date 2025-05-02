import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loading';

const Edit = () => {
  const [products, setProducts] = useContext(ProductContext); // Or use { products, setProducts } if context is object
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (products?.length > 0) {
      const foundProduct = products.find((p) => p.id === Number(id));
      if (foundProduct) {
        setProduct({ ...foundProduct });
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "price" ? Number(value) : value;
    setProduct((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((p) =>
      p.id === Number(id) ? product : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    navigate('/');
  };

  return product ? (
    <div className="w-[70%] m-auto p-[5%] flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5">Edit Product</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5 items-center"
      >
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="border p-2 w-[50%] rounded"
          placeholder="Image URL"
          required
        />

        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="border p-2 w-[50%] rounded"
          placeholder="Product Title"
          required
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="border p-2 w-[50%] rounded"
          placeholder="Price"
          required
        />

        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="border p-2 w-[50%] rounded"
          placeholder="Category"
          required
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="border p-2 w-[50%] rounded h-32"
          placeholder="Product Description"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  ) : (
    <Loading />
  );
};

export default Edit;
