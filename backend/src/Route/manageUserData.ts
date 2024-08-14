import express, { Request, Response } from "express"
import { deleteUserData, getUserData, getUsersData, updateUserData } from "./util/handlePrisma"
import { UpdateUserData } from "../../custom"
import { upload } from "./util/fileUpload"
import fs from 'fs'
import path from 'path'
import { validateMIMEType } from "validate-image-type"

export const manageUserDataRoute = express.Router()

manageUserDataRoute.get('/users', async (req: Request, res: Response) => {
    const usersData = await getUsersData()
    const users = usersData.map(({ user_password, ...rest }) => rest)
    res.status(200).send(users)
})

manageUserDataRoute.get('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const userData = await getUserData(id)
    if (userData == null) return res.status(404).json({ message: "Data Not Found" })
    res.status(200).json(userData)
})

manageUserDataRoute.put('/user/:id', upload.single('image'), async (req: Request, res: Response) => {
    const { id } = req.params
    const { user_name, user_email, Bio, user_password } = req.body
    const file = req.file as Express.Multer.File
    
    try {
        const oldUserData = await getUserData(id as string)
        if (!file) {
            const data: UpdateUserData = {
                user_name,
                user_email,
                Bio,
                user_password,
                image_name: oldUserData?.image_name as string
            }
            const userData = await updateUserData(id, data)
            return res.status(200).json(userData)
        } 
        console.log(path.join(__dirname, '../../'))
        const validationResult = await validateMIMEType(file.path, {
            allowMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml']
        })
        
        if (!validationResult.ok) {
            throw new Error("The file type is not supported")
        }
        fs.unlinkSync(path.join(__dirname, '../../../', '/client', 'public', '/uploads', oldUserData?.image_name as string))

        const data: UpdateUserData = {
            user_name,
            user_email,
            Bio,
            user_password,
            image_name: file.filename
        }
        const userData = await updateUserData(id, data)
        res.status(200).json(userData)
    } catch (err) {
        console.error(err)
        if (file) {
            fs.unlinkSync(path.join(__dirname, '../../', file.path))
        }
        res.status(404).json("There was an error processing the request")
    }
})

manageUserDataRoute.delete('/user/:id', async(req: Request, res: Response) => {
    const { id } = req.params
    try {
        const actualId = await deleteUserData(id)
        console.log(actualId)
        res.status(200).json(`Delete Successfully for ${id}`)
    } catch(err) {
        console.error(err)
        res.status(403).json(`Fail to delete ${id}` )
    }
    // get user data first and compare with params
})

// manageUserDataRoute.put('/user/:id', upload.single('image'), async (req: Request, res: Response) => {
//     const { id } = req.params
//     const { user_name, user_email, Bio, user_password } = req.body
//     const file = req.file as Express.Multer.File
//     console.log(file)
//     try {
//         if (file == null) {
//             const oldUserData = await getUserData(id as string)
//             const data: UpdateUserData = {
//                 user_name,
//                 user_email,
//                 Bio,
//                 user_password,
//                 image_name: oldUserData?.image_name as string
//             }
//             const userData = await updateUserData(id, data)
//             res.status(200).json(userData)
//         } 
//         const validationResult = await validateMIMEType(req.file?.path as string, {
//                 allowMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml']
//             })
            
//         if (!validationResult.ok) {
//             throw new Error("The file not successfully inserted")
//         }
//         const data: UpdateUserData = {
//             user_name,
//             user_email,
//             Bio,
//             user_password,
//             image_name: file.filename as string
//         }
//         const userData = await updateUserData(id, data)
//         res.status(200).json(userData)
//     } catch(err) {
//         console.error(err)
//         if (file == null) return
//         fs.unlinkSync(path.join(__dirname, '../../', file.path as string))
//         res.status(404).send("Please insert the file correctly")
//     }
    
// })