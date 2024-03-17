const SeparationHelper = require('../../helpers/separation')

const NewProject = (descripcion) => {    
    let NewText = SeparationHelper(descripcion)
    return NewText
}

module.exports = NewProject