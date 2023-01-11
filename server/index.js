import express, { application } from "express";
import cors from 'cors'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
import { connection } from "./database/db.js"
import { User } from "./model/users.js";
import { Product } from "./model/product.js";
const app = express();
app.use(cors());
const PORT = process.env.PORT || 7000;
app.use(express.json());
connection();
const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
app.get("/", (req, res) => {
    res.send("this is get request")
})

app.post('/signup', async (req, res) => {
    try {
        const user = await User.create(req.body);
        console.log(user);
        jwt.sign({ user }, tokenSecretKey, { expiresIn: '7200s' }, (err, token) => {
            if (token) {
                res.send({ user: user, token: token })
            } else {
                res.send({ result: "something went wrong please try after some time" });
            }
        })
    } catch (err) {
        console.log("Error ", err.message);
    }
})
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (email && password) {
            const user = await User.findOne({ email, password })
            if (user) {
                jwt.sign({ user }, tokenSecretKey, { expiresIn: '7200s' }, (err, token) => {
                    if (token) {
                        res.send({ user: user, token: token })
                    } else {
                        res.send({ result: "something went wrong please try after some time" });
                    }
                })

            } else {
                res.send("Please enter correct email or password")
            }
        } else {
            res.send("Please enter email and password both");
        }
    } catch (err) {
        console.log("Error ", err.message)
    }

})



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
        jwt.verify(token, tokenSecretKey, (err, valid) => {
            if (err) {
                res.status(401).send("Please provide valid token");
            } else {
                next()
            }

        })
    } else {
        res.status(403).send("Please add token with header")
    }

}






app.post("/add-product", authenticateToken, async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.send(newProduct)
    } catch (err) {
        console.log("Error ", err.message)
    }
})

app.get("/get-products", authenticateToken, async (req, res) => {
    try {
        const allProducts = await Product.find();
        if (allProducts.length > 0) {
            res.send(allProducts);
        } else {
            res.send({ data: "No Product Found" })
        }

    } catch (err) {
        console.log("Error ", err.message)
    }
})
app.delete("/delete-product/:_id", authenticateToken, async (req, res) => {
    try {
        const id = req.params._id
        const deleted = await Product.deleteOne({ _id: id })
        res.send(deleted)

    } catch (err) {
        console.log("Error ", err.message);
    }
})
app.get("/update/:id", authenticateToken, async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id })
        if (product) {
            res.send(product)
        } else {
            res.send({ data: "No record found" })
        }
    } catch (err) {
        console.log("Error ", err.message);
    }
})
app.patch("/update/:id", authenticateToken, async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.send(product);
    } catch (err) {
        console.log("Error ", err.message)
    }
})

app.get('/search/:key', authenticateToken, async (req, res) => {
    const result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } }
            // { category: { $regex: req.params.key } }
            // { company: { $regex: req.params.key } }
        ]
    })
    res.send(result);
})

app.get("/user-specific-product/:_id", async (req, res) => {
    const products = await Product.find({ userId: req.params._id })
    if (products) {
        res.send(products)
    }
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})