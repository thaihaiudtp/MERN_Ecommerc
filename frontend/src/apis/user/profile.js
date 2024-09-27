import Cookies from "js-cookie"
export default async function Profile(){
    try {
        const response = await fetch('http://localhost:3004/user/getone', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get("AccessToken")}`
            }
        });
        if(!response.ok){
            throw new Error("Lỗi");
            
        } else {
            const data = await response.json();
            console.log(data)
            return data.result;
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null; 
    }
}