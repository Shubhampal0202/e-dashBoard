import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./addProduct.css"

function AddProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price || !category || !company) {
            setError(true);
        } else {
            const user = JSON.parse(localStorage.getItem("user"))
            const API_URL = 'http://localhost:7000'
            const productDetails = { name, price, category, userId: user._id, company }
            setName("");
            setPrice("");
            setCategory("");
            setCompany("")
            const res = await axios.post(`${API_URL}/add-product`, productDetails, {
                headers: {
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            console.log("res ", res.data)
            setError(false)
            navigate("/");
        }

    }
    return (
        <div className='product-details-container'>
            <h1>Product</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }}
                    placeholder="Enter Product Name" className='product-inputs' />
                {error && !name && <span className='product-span'>Enter product name!</span>}

                <input type="text" value={price} onChange={(e) => { setPrice(e.target.value) }}
                    placeholder="Enter Product Price" className='product-inputs' />
                {error && !price && <span className='product-span'>Enter product Price!</span>}

                <input type="text" value={category} onChange={(e) => { setCategory(e.target.value) }}
                    placeholder="Enter Product Category" className='product-inputs' />
                {error && !category && <span className='product-span'>Enter product Category!</span>}

                <input type="text" value={company} onChange={(e) => { setCompany(e.target.value) }}
                    placeholder="Enter Product Company" className='product-inputs' />
                {error && !company && <span className='product-span'>Enter product Company!</span>}
                <button className='product-btn' onClick={handleSubmit}>Add Product</button>
            </form>
        </div>


    )
}

export default AddProduct