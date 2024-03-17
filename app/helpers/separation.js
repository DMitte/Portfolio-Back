const separation = (text) => {
    /*
    CODIGOS PARA SEPARAR EL TEXTO

    %ser% : Separar secciones
    %til% : Separar el titulo del texto
    %br%  : Separar los parrafos que va a tener esa seccion
    */
    
    const secciones = text.split("%ser% ")

    const NewText = { };    
    

    secciones.forEach((item, index) => {        
        let array = item.split(' %til% ')
        let objet1 = { ...array }

        //separacion de parrafos
        let Descriptions = objet1[1].split(' %br% ')

        let data = {
            title: objet1[0],
            description: Descriptions
        }
        NewText[`seccion ${index}`] = { data }
    })
    return NewText
}

module.exports = separation