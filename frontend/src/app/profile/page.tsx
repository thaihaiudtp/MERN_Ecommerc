'use client'
import { useEffect, useState } from "react"
import Profile from "@/apis/user/profile"
import { useRouter } from "next/navigation"
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    address: string[]; // Thay đổi thành string[] nếu address là mảng chuỗi
    cart: any[]; // Bạn có thể thay đổi loại này nếu cần
    telephone: string | null;
}
export default function ProfileUser(){
    const[user, setUser] = useState<User |null>(null)
    const[err, setErr] = useState("");
    const[loading, setLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {
        async function getProfile() {
            try {
                const data = await Profile();
                if (!data) {
                    setErr("Bạn cần đăng nhập!");
                    alert("Bạn cần đăng nhập!"); // Chỉ alert khi không có dữ liệu
                    router.push("/login");
                } else {
                    setUser(data);
                }
            } catch (error) {
                setErr("Có lỗi xảy ra trong quá trình lấy thông tin!");
                alert("Có lỗi xảy ra trong quá trình lấy thông tin!"); // Alert lỗi
            } finally {
                setLoading(false);
            }
        }

        getProfile();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (err) {
        return <div>{err}</div>; 
    }
    return(
        <div className="mt-14 pt-10 p-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Full name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email address
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Phone number
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Address
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user?.name}
                </th>
                <td className="px-6 py-4">
                    {user?.email}
                </td>
                <td className="px-6 py-4">
                    {user?.telephone}
                </td>
                <td className="px-6 py-4">
                    {user?.address}
                </td>
            </tr>



            </tbody>
        </table>

    </div>

    )
    }