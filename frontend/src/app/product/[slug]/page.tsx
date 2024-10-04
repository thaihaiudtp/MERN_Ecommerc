'use client'
import { ProductInfo } from "@/apis/products/index";
import { useEffect, useState } from "react";
import addToCart from '@/apis/user/addToCart'
interface ProductPageProps {
    params: {
      slug: string;
    };
  }
  
  interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    slug: string;
    brand: string;
  }
export default function InfoProduct({params}: ProductPageProps){
    const {slug} = params;
    const[product, setProduct] = useState<Product | null>(null);
    const[error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState('');
    //Hàm chọn quantity
    const decreaseQuantity = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
    };
    
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    console.log(quantity)
    //Hàm chọn color 
    const handleChooseColor = (color: any) => {
        setColor(color)
        
    };
    console.log(color)

    useEffect(()=>{
        const getProduct = async () => {
            try {
                const data = await ProductInfo(slug);
                console.log(data)
                setProduct(data)
            } catch (error) {
                if (error instanceof Error) {
                    // Sử dụng instance để đảm bảo error là một Error
                    setError(error.message); // Sử dụng message từ error
                } else {
                    setError('An unexpected error occurred'); // Đối với các lỗi không phải là Error
                }
            }
        }
        getProduct();
    }, [slug]);
    //console.log(product?._id)
    const handleAddToCart = async() => {
        if (!product?._id || !color) {
            alert("Bạn cần chọn sản phẩm và màu sắc trước khi thêm vào giỏ hàng.");
            return;
        }
        await addToCart(product?._id, color, quantity);
        setColor('')
        setQuantity(1)
    }
    if (error) {
        return <div>{error}</div>;
      }
    
      if (!product) {
        return <div>Loading...</div>;
      }
    return (
        <div className="font-sans p-8 tracking-wide max-lg:max-w-2xl mx-auto mt-14">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-4 text-center lg:sticky top-8">
                    <div className="bg-gray-100 p-4 flex items-center sm:h-[380px] rounded-lg">
                        <img src={product.image} alt="Product" className="w-full max-h-full object-contain object-top" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 p-4 flex items-center rounded-lg sm:h-[182px]">
                            <img src={product.image} alt="Product" className="w-full max-h-full object-contain object-top" />
                        </div>

                        <div className="bg-gray-100 p-4 flex items-center rounded-lg sm:h-[182px]">
                            <img src={product.image} alt="Product" className="w-full max-h-full object-contain object-top" />
                        </div>
                    </div>
                </div>

                <div className="max-w-xl">
                    <div>
                        <h2 className="text-2xl font-extrabold text-white">{product.title}</h2>
                        <p className="text-sm text-white mt-2">{product.brand}</p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-white text-4xl font-bold">${product.price}</h3>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <button type="button" className="min-w-[200px] px-4 py-3 bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg">Buy now</button>
                        <button onClick={handleAddToCart} type="button" className="min-w-[200px] px-4 py-2.5 border border-blue-400 bg-transparent hover:bg-zinc-600 text-white text-sm font-semibold rounded-lg">Add to cart</button>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-xl font-bold text-white">Choose quantity</h3>
                        <div className="mt-4">
                        <button
                        type="button"
                        className="flex items-center px-2.5 py-1.5 border border-gray-300 text-white text-xs outline-none bg-transparent rounded-md"
                        >
                        {/* Nút giảm số lượng */}
                        <svg
                            onClick={decreaseQuantity}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2.5 fill-current cursor-pointer"
                            viewBox="0 0 124 124"
                        >
                            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" />
                        </svg>

                        {/* Hiển thị số lượng */}
                        <span className="mx-2.5">{quantity}</span>

                        {/* Nút tăng số lượng */}
                        <svg
                            onClick={increaseQuantity}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2.5 fill-current cursor-pointer"
                            viewBox="0 0 42 42"
                        >
                            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
                        </svg>
                        </button>
                        </div>
                    </div>

                        <hr className="my-8" />
                    <div className="mt-5">
                            <h3 className="text-xl font-bold text-white">Choose a Color</h3>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <button onClick={() => handleChooseColor('black')} type="button" className="w-10 h-10 bg-black border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                                <button onClick={() => handleChooseColor('gray')} type="button" className="w-10 h-10 bg-gray-400 border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                                <button onClick={() => handleChooseColor('orange')} type="button" className="w-10 h-10 bg-orange-400 border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                                <button onClick={() => handleChooseColor('red')} type="button" className="w-10 h-10 bg-red-400 border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                            </div>
                        </div>
                    <div className="mt-8">
                        <ul className="flex border-b">
                            <li
                                className="text-white font-bold text-sm  py-3 px-8 border-b-2 border-white cursor-pointer transition-all">
                                Description</li>
                            
                        </ul>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-white">Product Description</h3>
                            <p className="text-sm text-white mt-4">{product.description}</p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}