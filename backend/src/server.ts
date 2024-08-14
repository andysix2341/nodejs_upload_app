import express from "express"
import { userRegisterRoute } from "./Route/userRegister"
import dotenv from "dotenv"
import cors from "cors"
import { manageUserDataRoute } from "./Route/manageUserData"

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use("/", userRegisterRoute)
app.use("/", manageUserDataRoute)

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port 3000")
})