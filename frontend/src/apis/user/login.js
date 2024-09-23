import Cookies from "js-cookie";
export default async function LoginUser(email, password){
    try {
        const response = await fetch('http://localhost:3004/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            credentials: 'include', 
            
            body: JSON.stringify({email, password})
        });
        const data = await response.json();

        if(data.isLogin === "true"){
            console.log(data);
            console.log(data.update)
            Cookies.set('User', JSON.stringify(data.update));
            Cookies.set('AccessToken', data.AccessToken);
            
  

            alert("Đăng nhập thành công")
            return data;
        } else {
            alert("Đăng nhập thất bại")
        }
    } catch (error) {
        console.error('login error:', error.message);
        return { success: false, message: error.message };
    }
}