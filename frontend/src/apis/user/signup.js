export default async function Signup(email, password, name){
    try {
        const response = await fetch('http://localhost:3004/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password, name})
        });
        const data = await response.json();
        if(!response.ok) throw new Error(data.message || 'Something wrong')
        return data
    } catch (error) {
        console.error('Sign up error:', error.message);
        return { success: false, message: error.message };
    }
}