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
    <div>
        <div className="mt-8">
        <h1 className="text-lg leading-6 font-medium text-white">
            User Profile
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-white-500">
            This is some information about the user.
        </p>
    </div>
    <div className="bg-black shadow border mt-14">

    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-white-500">
                    Full name
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                    {user?.name}
                </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-white-500">
                    Email address
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                    {user?.email}
                </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-white-500">
                    Phone number
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                    {user?.telephone}
                </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-white-500">
                    Address
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                    {user?.address}
                </dd>
            </div>
        </dl>
    </div>
</div>
</div>
    )
}