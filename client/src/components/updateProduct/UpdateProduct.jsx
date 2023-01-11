import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "./updateProduct.css"
function UpdateProduct() {
    const API_URL = 'http://localhost:7000'
    const params = useParams()
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        const res = await axios.get(`${API_URL}/update/${params._id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        setName(res.data.name)
        setPrice(res.data.price)
        setCategory(res.data.category)
        setCompany(res.data.company)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedDetails = { name, price, category, company }
        const res = await axios.patch(`${API_URL}/update/${params._id}`, updatedDetails, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        setName("")
        setPrice("")
        setCategory("")
        setCompany("")
        navigate("/");
    }
    return (
        <div className='product-details-container'>
            <h2 className='update-product-heading'> Update Product</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }}
                    placeholder="Enter Product Name" className='product-inputs' />


                <input type="text" value={price} onChange={(e) => { setPrice(e.target.value) }}
                    placeholder="Enter Product Price" className='product-inputs' />


                <input type="text" value={category} onChange={(e) => { setCategory(e.target.value) }}
                    placeholder="Enter Product Category" className='product-inputs' />


                <input type="text" value={company} onChange={(e) => { setCompany(e.target.value) }}
                    placeholder="Enter Product Company" className='product-inputs' />

                <button className='product-btn' onClick={handleSubmit}>Update Product</button>
            </form>
        </div>
    )
}

export default UpdateProduct