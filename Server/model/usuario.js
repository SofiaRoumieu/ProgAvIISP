const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    correo: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true,
        minLength: 6
    }
});


usuarioSchema.set('toJSON', {
    transform: (document, userJSON) => {
        userJSON.id = document._id.toString();
        delete userJSON._id;
        delete userJSON.__v;
        delete userJSON.clave;
    }
});



const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
