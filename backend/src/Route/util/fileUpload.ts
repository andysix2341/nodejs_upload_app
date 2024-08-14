import multer from "multer"

// change the path if you use this
const storage = multer.diskStorage({
    destination: "../../my-project/client/public/uploads",
    filename: (req, file, cb) => {
        const uniqueFileName = `${Date.now()}--${file.originalname}`
        cb(null, uniqueFileName)
    }
})

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/svg" 
        ) {
            return cb(null, true)
        } else {
            return cb(new Error("Insert png or svg or jpeg or jpg file") as any, false)
        }
        
    }, limits: {
        fileSize: 10 * 1024 * 1024
    }
})


