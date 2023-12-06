const mongoose = require("mongoose");

const mascotaSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    tipo: String,
    vacunado: Boolean,
    observaciones: String
});


mascotaSchema.set('toJSON', {
    transform: (document, mascotaJSON) => {
        mascotaJSON.id = document._id.toString();
        delete mascotaJSON._id;
        delete mascotaJSON.__v;
    }
});



const Mascota = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascota;
