import React, { useContext, useState } from 'react';
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const AddProductHandler = (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      title.trim().length < 4 ||
      image.trim().length < 4 ||
      category.trim().length < 4 ||
      isNaN(price) || price <= 0 ||
      description.trim().length < 4
    ) {
      toast.error('All fields must have at least 4 characters and price must be valid!');
      return;
    }

    const product = {
      id: nanoid(6), // short ID for easier debugging
      title: title.trim(),
      image: image.trim(),
      category: category.trim(),
      price: parseFloat(price),
      description: description.trim(),
    };

    const updatedProducts = [...(products || []), product];

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    toast.success('Product added successfully! 🎉');

    // Clear form
    setTitle('');
    setImage('');
    setCategory('');
    setPrice('');
    setDescription('');

    navigate('/');
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="p-[5%] w-screen h-screen flex-col items-center flex overflow-y-auto"
    >
      <h1 className="text-3xl w-1/2 mb-5 font-semibold text-center">Add New Product</h1>

      <input
        type="url"
        placeholder="Image Link"
        className="text-lg bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setImage(e.target.value)}
        value={image}
        required
      />

      <input
        type="text"
        placeholder="Title"
        className="text-lg bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />

      <div className="w-1/2 flex justify-between gap-2 mb-3">
        <input
          type="text"
          placeholder="Category"
          className="text-lg bg-zinc-100 rounded p-3 w-1/2"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="text-lg bg-zinc-100 rounded p-3 w-1/2"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Enter product description here..."
        className="text-lg bg-zinc-100 rounded p-3 w-1/2 mb-3"
        rows="6"
        required
      ></textarea>

      <div className="w-1/2">
        <button
          type="submit"
          className="py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
        >
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
