export default async function Logout(){
    try {
        const response = await fetch('http://localhost:3004/user/logout', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
        console.log("Response status:", response.status);
        console.log("Response status text:", response.statusText);
        if (response.ok) {
            const data = await response.json();
            return {success: true, ...data};
        }
        
    } catch (error) {
        return { success: false, message: error.message };
    }
}