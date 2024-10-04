import Cookies from "js-cookie"

export default async function addToCart(pid, color, quantity){
    try {
        const data = await fetch('http://localhost:3004/user/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get("AccessToken")}`
            },
            body: JSON.stringify({pid, color, quantity})
        })
        const rs = await data.json()
        if(rs.success){
            alert('Thêm thành công')
        } else {
            alert('Đăng nhập chưa mà đòi thêm? Đăng nhập đi')
        }
    } catch (error) {
        alert('Bạn cần đăng nhập!')
    }

}