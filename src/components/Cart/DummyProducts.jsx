import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

function DummyProducts() {
    
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    async function getProducts() {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
    }

    useEffect(() => {
        getProducts();
    }, []);
    
    return (
        <>
            <div className='flex flex-col justify-center bg-gray-100'>
                <div className='flex justify-between items-center px-20 py-5'>
                    <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>
                </div>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
                    {products.map(product => (
                    <div key={product.id} className='bg-white shadow-md rounded-lg px-10 py-10'>
                        <img src={product.image} alt={product.title} className='w-48 h-48 object-cover mx-auto' />
                        <h2 className='text-lg font-bold mt-5'>{product.title}</h2>
                        <p className='text-sm text-gray-500 mt-2'>{product.description}</p>
                        <p className='text-xl font-bold mt-2'>${product.price}</p>
                        <button
                        onClick={() => addToCart(product)}
                        className='bg-blue-500 text-white px-3 py-2 mt-5'>
                        Add to Cart
                        </button>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DummyProducts;