import express, { Request, Response } from "express"
import { upload } from "./util/fileUpload"
import crypto from "node:crypto"
import { saveUserData } from "./util/handlePrisma"
import fs from "fs"
import { validateMIMEType } from "validate-image-type"
import { UserData } from "../../custom"
import path from 'path'


export const userRegisterRoute = express.Router()

userRegisterRoute.get("/register", (req, res) => {
    res.send("hello")
})

userRegisterRoute.post("/register", upload.single("image_profile_path"), async(req: Request, res: Response) => {
    const { user_name, user_email, user_password, Bio } = req.body
    const file = req.file as Express.Multer.File
    const id = crypto.randomUUID().toString()
    try {
        const validationResult = await validateMIMEType(req.file?.path as string, {
            allowMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml']
        })
        console.log(path.join(__dirname, '../../../'))
        if (!validationResult.ok) {
            throw new Error("The file not successfully inserted")
        }
        const userData:UserData = {
            user_id: id,
            user_name,
            user_email,
            user_password,
            Bio,
            image_name: file.filename
        }
        await saveUserData(userData)
        res.status(200).json({ id, user_name, user_email, Bio, imageName: file.filename })
        
    } catch(err) {
        console.error(err)
        fs.unlinkSync(path.join(__dirname, '../../', file.path))
        res.status(404).send("Please insert the file correctly")
    }

})