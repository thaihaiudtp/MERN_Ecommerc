import Cookies from 'js-cookie'
export default async function deleteCart(pid){
    try {
        const rs = await fetch('http://localhost:3004/user/api/cart/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('AccessToken')}`
            },
            body: JSON.stringify({pid})
        })
        if(rs){
            const data = await rs.json()
            return data
        } else {
            alert('Có lỗi xảy ra!')
        }
    } catch (error) {
        alert('Có lỗi xảy ra!')
    }
}