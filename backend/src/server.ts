import express from "express"
import { userRegisterRoute } from "./Routes/userRegister"
import dotenv from "dotenv"
import cors from "cors"
import { manageUserDataRoute } from "./Routes/manageUserData"

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use("/", userRegisterRoute)
app.use("/", manageUserDataRoute)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000")
})