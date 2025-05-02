import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loading';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const [products, setProducts] = useContext(ProductContext);

  useEffect(() => {
    if (products?.length > 0) {
      const foundProduct = products.find(p => p.id === id); // FIXED
      setProduct(foundProduct || null);
    }
  }, [id, products]);

  const ProductDeleteHandler = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    navigate('/');
  };

  const ProductEditHandler = (id) => {
    navigate(`/edit/${id}`);
  };

  if (!product) return <Loading />;

  return (
    <div className='w-full max-w-5xl mx-auto py-10 px-5 flex flex-col md:flex-row items-center gap-10'>
      <img className='w-full md:w-1/2 object-contain' src={product.image} alt={product.title} />
      <div className='w-full md:w-1/2'>
        <h1 className='text-3xl font-semibold'>{product.title}</h1>
        <h3 className='text-zinc-400 my-4 text-xl'>{product.category}</h3>
        <h2 className='text-red-400 font-semibold text-2xl'>${product.price}</h2>
        <p className='mb-6 text-sm'>{product.description}</p>
        <div className='flex gap-4'>
          <button
            onClick={() => ProductEditHandler(product.id)}
            className='px-5 py-2 border border-blue-200 text-blue-400 rounded'
          >
            Edit
          </button>
          <button
            onClick={() => ProductDeleteHandler(product.id)}
            className='px-5 py-2 border border-red-200 text-red-400 rounded'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
