//app/cart/page.js
'use client'
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useState, useEffect, useContext} from "react"
import getProduct from '@/apis/cart/productInCart'
import deleteCart from '@/apis/cart/deleteCart'
import { AuthContext } from "@/context/AuthContext"
interface Product {
    productId: string
    title: string
    image: string
    price: number
    color: string
    quantity: number
    totalPrice: number
    _id: string
}

export default function Cart() {
    const{isAuth} = useContext(AuthContext)
    const[product, setProduct] = useState<Product[]>([])
    const [selectProduct, setSelectProduct] = useState<string>('')
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const router = useRouter()
    console.log(isAuth)
    const handleDelete = async () => {
        if(!selectProduct){
            alert('Vui lòng chọn sản phẩm!')
            return
        }
        try {
            const response = await deleteCart(selectProduct)
            if(response){
                alert('Xóa thành công!')
                setSelectProduct('')
                setDeleteSuccess(true)
            }
            
        } catch (error) {
            alert('Có lỗi xảy ra khi xóa sản phẩm')
        }
    }
    useEffect(()=>{
       
        const getProducts = async () => {
            console.log("isAuth changed:", isAuth);
            try {
                if (!isAuth) {
                    const token = Cookies.get('AccessToken');
                    if (!token) {
                        router.push('/login');
                    }
                }
                const data =  await getProduct()
                if(data){
                    console.log(data)
                    setProduct(Array.isArray(data) ? data : []);
                } else {
                    
                    alert('Ban can dang nhap!')
                }
          
            } catch (error) {
                alert('Loi!')
            }
        }
        getProducts()
        if(deleteSuccess){
            router.refresh()
            setDeleteSuccess(false)
        }
    }, [isAuth, router, deleteSuccess])
    
    console.log(selectProduct)
    const handleSelectProduct = (_id: string) => {
        setSelectProduct((prevSelect) => {
            if (prevSelect.includes(_id)) {
                // Nếu sản phẩm đã được chọn, xóa _id khỏi chuỗi
                const updatedSelect = prevSelect
                    .split(',')
                    .filter(id => id !== _id)
                    .join(',');
                return updatedSelect;
            } else {
                // Nếu chưa chọn, thêm _id vào chuỗi
                return prevSelect ? `${prevSelect},${_id}` : _id;
            }
        });
    
}

    return(
        <div className="mt-14 pt-10 p-3">
            
            <div className="flex-auto mt-2 mb-3 mx-2">
                   
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thanh toán</button>
                    <button onClick={handleDelete} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Xóa</button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Choose
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(product) && product.length > 0 ? (
                    product.map((products)=>(
                    <tr key={products._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {products.title}
                    </th>
                    <td className="px-6 py-4">
                        {products.color}
                    </td>
                    <td className="px-6 py-4">
                        {products.quantity}
                    </td>
                    <td className="px-6 py-4">
                        {products.price}
                    </td>
                    <td className="px-6 py-4">
                        {products.totalPrice}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                            <input onChange={() => handleSelectProduct(products._id)} checked={selectProduct.includes(products._id)} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            
                        </div>
                    </td>
                </tr>
                    ))) : (
                    <tr>
                        <td colSpan={6} className="text-center py-4">
                            Giỏ hàng của bạn đang trống.
                        </td>
                    </tr>
                    )}

                </tbody>
            </table>

        </div>

    )
}