import React from "react";
import axios from "axios"
import "./profile.css"
import { useEffect } from "react";
import profile from "../../images/user-profile.jpg"
import { useState } from "react";
const Profile = () => {
    const auth = JSON.parse(localStorage.getItem("user"))
    const API_URL = "http://localhost:7000/user-specific-product"
    const { _id, name, email } = auth
    const [product, setProducts] = useState([]);
    console.log("auth ", auth)
    useEffect(() => {
        getproducts()
    }, [])
    const getproducts = async () => {
        const res = await axios.get(`${API_URL}/${_id}`)
        setProducts(res.data);
        console.log("res ", res.data);
    }
    return (
        <div className="user-container">
            <div className="user-profile">
                <img src={profile} alt="" />
                <div><strong>{name}</strong></div>
                <div><strong>{email}</strong></div>
            </div>
            <div className="my-product-container">
                <h2>My Products</h2>
                <hr className="my-product-hr" />
                <div className="table">
                    <div className="table-heading">
                        <div><strong>Serial No.</strong></div>
                        <div><strong>Name</strong></div>
                        <div><strong>Price</strong></div>
                        <div><strong>Category</strong></div>
                    </div>
                    {
                        product.length>0 ? product.map((product, indx) => {
                            return (
                                <div className="table-heading">
                                    <div>{indx + 1}</div>
                                    <div>{product.name}</div>
                                    <div>$ {product.price}</div>
                                    <div>{product.category}</div>
                                </div>
                            )
                        }):<div><h2>No Products</h2></div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile;