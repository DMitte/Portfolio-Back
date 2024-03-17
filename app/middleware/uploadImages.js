const multer = require('multer')
const admin = require('firebase-admin')
const accountServicesKey =  require('../../serviceAccountKey.json')
const storage = multer.memoryStorage({})

const upload = multer({storage: storage})


// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(accountServicesKey),
    storageBucket: "task-web-81967.appspot.com",
});

const bucket = admin.storage().bucket()

const uploadMiddleware = (req,res,next) => {
    upload.array('images')(req, res, (err) => {
        const files = req.files;
        if (!files && req.url === "/new") {
        return res.status(400).send("No se ha subido ningún archivo");
        } else if (req.url === "/new") {
            const imagesNames = []
            const urlImages = []
            const uploadPromises = files.map((file) => {
                return new Promise((resolve, reject) =>{
                    const blob = bucket.file(`${Date.now()}_${file.originalname}`);

                    const blobStream= blob.createWriteStream({
                        metadata: {
                            contentType: file.mimetype,
                        },
                    });

                    blobStream.on("error", (error) => {
                        console.error(error);
                        reject(error);
                    });

                    blobStream.on("finish", () => {
                        imagesNames.push(blob.name)   
                        blob.getSignedUrl({
                            action: 'read',
                            expires: '03-09-2491'
                        }).then(signedUrls => {
                            urlImages.push(signedUrls[0]);
                        })                                          
                        resolve()
                    });

                    blobStream.end(file.buffer);
                })
            })
            Promise.all(uploadPromises)
                .then(() => {
                    req.body.images = imagesNames;
                    req.body.urlsImges = urlImages;
                    next()
                })
                .catch((error) => {
                    console.error(error)
                    res.status(500).send('Error al subir los archivos')
                })
        }else{
        next()
        }
    })
}

module.exports = uploadMiddleware