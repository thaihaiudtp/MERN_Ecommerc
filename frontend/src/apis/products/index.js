//Lấy products
export async function Show(){
    let data = await fetch('http://localhost:3004/product/getall',{ cache:'no-store'})
    let result = await data.json()
    //console.log(result)
    return result.data.products
}