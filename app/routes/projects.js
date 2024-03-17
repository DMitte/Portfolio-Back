const router = require('express').Router()
const Projects = require('../models/projects')


//Import Controller
const FindOneProject = require('../controller/project/one')
const NewProject = require('../controller/project/new')

router.get('/all', async (req,res) => {
    try{
        const projects = await Projects.find();
        res.status(200).json({
            error: false,
            message:  'All Projects fetched successfully!',
            data: {projects} 
        })
    }catch(err) {
        res.status(400).json({
            error: true,
            message: 'Error getting projects',
            data: err
        })
    }
})
router.post('/new', async (req, res) => {

    try {
        const newDescription = NewProject(req.body.description)
        let str = req.body.tags
        
        

        let tags = str.split(" ")

        let project = new Projects ({
            title: req.body.title,
            description: newDescription,
            tags: tags,
            images: [
                names = req.body.images,
                urls = req.body.urlsImges
            ],
            dates: [
                upload = Date.now(),
                create = Date.parse(req.body.date)            
            ]
        });

        await project.save();

        res.status(200).json({
            error: false,
            message: "Project created Successfully",
        })

    }catch(err){
        res.status(400).json({
            error: true,
            message:  "Failed to create new project",
            data: err
        })
    }
})

router.post('/one', async (req, res) => {
    const id = req.body.id
    try {
        const project = await FindOneProject(id)
        res.status(200).json({
            error: false,
            message: 'Project find successfully',
            project
        })
    } catch (err) {
        res.status(400).json({
            error: true,
            message: 'Error getting project',
            data: err
        })
    }

})

module.exports = router