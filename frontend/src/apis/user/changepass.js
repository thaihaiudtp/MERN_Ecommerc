
export default async function ChangePass(password, token){
   
    const data = await fetch('http://localhost:3004/user/changePassword', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            password, 
            resetToken: token
        })
        
    })
    const rs = await data.json()
    if(rs.success){
        alert("Thay đổi mật khẩu thành công");
        
    } else {
        alert("Thay đổi mật khẩu thất bại");
        
    }
    //return await data.json();
}