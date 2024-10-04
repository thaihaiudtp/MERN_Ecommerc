import Cookies from 'js-cookie'
export default async function getProduct(){
    try {
        const rs = await fetch('http://localhost:3004/user/api/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('AccessToken')}`
            }
        })
        const data = await rs.json()
        console.log(data)
        if(data){
            //alert('OK!')
            return data
        } else {
            return null
        }
    } catch (error) {
        //alert('Error')
    }
}