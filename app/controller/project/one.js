const Project = require('../../models/projects')

const OneProject = (id) => {

	const project =  Project.findOne({ _id: id})
	
	return project;

}

module.exports = OneProject