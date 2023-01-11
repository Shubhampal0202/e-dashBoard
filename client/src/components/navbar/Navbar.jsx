import React from "react";
import "./navbar.css"
import { Link, useNavigate } from "react-router-dom"
const Navbar = () => {

    const navigate = useNavigate();
    const auth = localStorage.getItem("user")
    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    }
    return (
        <>
            {
                auth ?
                    <div className="navbar-container">
                        <div><img src="https://dynamic.brandcrowd.com/asset/logo/ff16bbbc-c17d-44ae-ac79-fb3afb500041/large?v=638070515465990592"
                            className="logo" alt="logo" /></div>
                        <div ><Link className="navlink" to='/'>products</Link></div>
                        <div><Link className="navlink" to='/add'>add product</Link></div>
                        <div><Link className="navlink" to='/profile'>profile ({JSON.parse(auth).name})</Link></div>
                        <div><Link className="navlink" onClick={logout} to='/signup'>logout</Link></div>
                    </div> :
                    <div className="navbar-container right">
                        <div><Link className="navlink" to='/signup'>Signup</Link></div>
                        <div><Link className="navlink margin-right" to='/login'>login</Link></div>
                    </div>
            }
        </>
    )
}
export default Navbar