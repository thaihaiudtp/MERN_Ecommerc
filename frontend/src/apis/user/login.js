export default async function LoginUser(email, password){
    try {
        const response = await fetch('http://localhost:3004/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });
        const data = await response.json();
        if(!response.ok) throw new Error(data.message || 'Something wrong')
        return data
    } catch (error) {
        console.error('login error:', error.message);
        return { success: false, message: error.message };
    }
}