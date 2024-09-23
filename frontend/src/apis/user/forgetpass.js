export default async function ForgetPass({email}){
    const url = new URL('http://localhost:3004/user/forgetPassword');
    if(email) {
        url.searchParams.set('email', email);
    }
    const data = await fetch(url);
    console.log(data);
    return data;
}