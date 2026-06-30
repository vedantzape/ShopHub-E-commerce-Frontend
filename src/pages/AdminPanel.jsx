import { useEffect, useState } from "react"
import API from "../services/api"

function AdminPanel() {

  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products")
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const clearForm = () => {
    setEditingId(null)
    setName("")
    setDescription("")
    setPrice("")
    setCategory("")
    setImageUrl("")
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const productData = {
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrl
    }
    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, productData)
        alert("Product Updated")
      } else {
        await API.post("/products", productData)
        alert("Product Added")
      }
      clearForm()
      fetchProducts()
    } catch (error) {
      console.log(error)
      alert("Operation Failed")
    }
  }

  const editProduct = (product) => {
    setEditingId(product.id)
    setName(product.name)
    setDescription(product.description)
    setPrice(product.price)
    setCategory(product.category)
    setImageUrl(product.imageUrl)
  }

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`)
      alert("Product Deleted")
      fetchProducts()
    } catch (error) {
      console.log(error)
      alert("Failed To Delete Product")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5 pb-24">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Categories</h2>
          <p className="text-3xl font-bold">
            {[...new Set(products.map(p => p.category))].length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Admin Status</h2>
          <p className="text-xl font-bold text-green-600">Active</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={saveProduct} className="space-y-3">
          <input type="text" placeholder="Product Name" value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg w-full" required />
          <input type="text" placeholder="Description" value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded-lg w-full" required />
          <input type="number" placeholder="Price" value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-3 rounded-lg w-full" required min="1" />
          <input type="text" placeholder="Category" value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg w-full" required />
          <input type="text" placeholder="Image URL" value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-3 rounded-lg w-full" />
          <button className="bg-black text-white px-5 py-3 rounded-lg w-full">
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button type="button" onClick={clearForm}
              className="bg-gray-500 text-white px-5 py-3 rounded-lg w-full">
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-4">
            <img src={product.imageUrl || "https://picsum.photos/300"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-3" />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-500">{product.category}</p>
            <p className="font-bold text-green-600 mt-2">₹ {product.price}</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => editProduct(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded flex-1">
                Edit
              </button>
              <button onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded flex-1">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel