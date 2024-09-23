//Lấy products
export async function Show({title, categoryId}){
    const url = new URL('http://localhost:3004/product/getall');
    if(title){
        url.searchParams.append('title', title)
    }
    if(categoryId){
        url.searchParams.append('categoryId', categoryId)
    }
    const data = await fetch(url);
    let result = await data.json()
    return result.data.products
}

export async function ProductInfo(slug){
    try {
        let rs = await fetch(`http://localhost:3004/product/getone/${slug}`);
        const data = await rs.json();
        console.log(data);
        if (!rs.ok) {
            throw new Error(data.message || 'Error fetching product data');
        }
        return data.message;
    } catch (error) {
        throw error;
    }
}