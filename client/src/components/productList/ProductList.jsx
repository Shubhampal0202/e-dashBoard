import React from 'react'
import axios from "axios"
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import "./productList.css"
function ProductList() {
    const API_URL = 'http://localhost:7000'
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        getAllProducts()
    }, [])
    const getAllProducts = async () => {
        const res = await axios.get(`${API_URL}/get-products`, {
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        console.log("responce ", res);
        setProductList(res.data)
        console.log("All results", res.data)
    }
    const handleDelete = async (_id) => {
        const res = await axios.delete(`${API_URL}/delete-product/${_id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        console.log(res.data)
        getAllProducts()
    }

    const handleChange = async (e) => {
        const key = e.target.value
        console.log(key)
        if (key) {
            const res = await axios.get(`${API_URL}/search/${key}`, {
                headers: {
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            setProductList(res.data);
            console.log(res.data)
        } else {
            getAllProducts()
        }
    }
    return (
        <div className='product-list-container'>
            <h1>Products List</h1>
            <hr className='product-list-hr' />
            <input type="text" onChange={handleChange} className="product-list-input" placeholder='Search Product By Name' />
            <div className='product-list-wrapper'>
                <div className='product-list bold'>
                    <div>Serial No.</div>
                    <div>Name</div>
                    <div>Price</div>
                    <div>Category</div>
                    <div>Operations</div>
                </div>
                {
                    productList.length > 0 ? productList.map((product, idx) => {
                        return <div className='product-list'>
                            <div>{idx + 1}</div>
                            <div>{product.name}</div>
                            <div>$ {product.price}</div>
                            <div>{product.category}</div>
                            <div className='delete-product'>
                                <div onClick={() => handleDelete(product._id)}>Delete</div>
                                <div><Link className='product-link' to={'/update/' + product._id}> Update</Link></div>
                            </div>
                        </div>
                    })
                        : <h2 className='product-list-h2'>No Result Found</h2>
                }
            </div>
        </div>
    )
}

export default ProductList