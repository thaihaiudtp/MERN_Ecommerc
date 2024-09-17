//import Image from "next/image";

export default async function Home() {
  let data = await fetch('http://localhost:3004/product/getall')
  let result = await data.json()
  let products = result.data.products
  console.log(products)
  return (
    <ul>
      {products.map((product) => (
        <li key={product._id}>
          <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-4">
          <div className="min-h-[256px]">
          <img src="https://readymadeui.com/Imagination.webp" className="w-full" />
          </div>

          <div className="p-6">
            <h3 className="text-gray-800 text-xl font-bold">{product.title}</h3>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">{product.description}</p>
            <button type="button" className="mt-6 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600">View</button>
          </div>
        </div>
        </li>
      ))}
    </ul>
  )
}
