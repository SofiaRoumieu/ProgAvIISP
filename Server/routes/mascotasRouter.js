const mascotaRouter = require('express').Router();
const { verifyToken } = require('../middlewares/auth');
const Mascota = require('../model/mascota');

//mascotaRouter.use(verifyToken);

mascotaRouter.get('/', (req, res) => {
    Mascota.find({}).then((mascotas) => {
        console.log(mascotas);
        res.json(mascotas);
    })
})

mascotaRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    Mascota.findById(id)
        .then((mascota) => {
            if (mascota) {
                console.log(mascota);
                res.json(mascota);
            } else {
                next();
            }
        })
        .catch(err => {
            next({ name: "TokenError", message: "Er" });
        })
});

mascotaRouter.post('/', (req, res, next) => {
    console.log(req.body);
    const { nombre, edad, tipo, vacunado, observaciones } = req.body;

    const nuevaMascota = new Mascota({ nombre, edad, tipo, vacunado, observaciones })

    nuevaMascota.save()
        .then((masc) => {
            console.log(masc);
            res.send(masc);
        })
        .catch(err => {
            next(err);
        })
});


mascotaRouter.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    Mascota.findByIdAndDelete(id)
        .then((masc) => {
            if (masc) {
                res.status(204).end();
            }
            next({ name: "ReferenceError", message: "No se encontro la mascota" });
        })
        .catch((err) => {
            next(err);
        })
})

mascotaRouter.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const { nombre, edad, tipo, vacunado, observaciones } = req.body;

    Mascota.findByIdAndUpdate(id, { nombre, edad, tipo, vacunado, observaciones }, { new: true })
        .then(masc => {
            if (masc) {
                console.log(masc);
                res.json(masc);
            }
            next({ name: "ReferenceError", message: "No se encontro la mascota" });
        })
        .catch(err => {
            next(err)
        })
})



module.exports = mascotaRouter;