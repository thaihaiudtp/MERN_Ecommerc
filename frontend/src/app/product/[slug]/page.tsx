'use client'
import { ProductInfo } from "@/apis/products/index";
import { useEffect, useState } from "react";
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
    useEffect(()=>{
        const getProduct = async () => {
            try {
                const data = await ProductInfo(slug);
                console.log(data)
                setProduct(data);
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
                        <button type="button" className="min-w-[200px] px-4 py-2.5 border border-blue-400 bg-transparent hover:bg-zinc-600 text-white text-sm font-semibold rounded-lg">Add to cart</button>
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