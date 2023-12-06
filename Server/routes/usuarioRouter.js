const usuarioRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuario');
const { SECRET } = require('../utils/config')
const bcrypt = require('bcrypt');
const saltRounds = 10;



usuarioRouter.get('/', (req, res, next) => {
    Usuario.find({}).then((usuarios) => {
        console.log(usuarios);
        res.json(usuarios);
    }).catch(err => {
        next(err)
    })
})


usuarioRouter.get('/:correo', (req, res) => {
    const { correo } = req.params;
    console.log(correo);

    Usuario.findOne({ correo })
        .then((usuario) => {
            if (usuario) {
                console.log(usuario);
                res.json(usuario);
            } else {
                next();
            }
        })
        .catch(err => {
            next(err);
        })
});


usuarioRouter.post('/', async (req, res, next) => {
    console.log(req.body);
    const { correo, clave } = req.body;

    let claveHash = await bcrypt.hash(clave, saltRounds);
    const nuevoUsuario = new Usuario({ correo, clave: claveHash });

    nuevoUsuario.save()
        .then((usuario) => {
            res.send(usuario);
        })
        .catch(err => {
            return next(err);
        })
});


usuarioRouter.post('/login', async (req, res, next) => {
    console.log(req.body);
    const { correo, clave } = req.body;

    const user = await Usuario.findOne({ correo });

    let correctPass = false;
    if (user != null) {
        correctPass = await bcrypt.compare(clave, user.clave);
    }

    if (!correctPass) {
        return next({ name: "ValidationError", message: "Usuario o contraseña incorrectos" });
    }
    const userToken = {
        username: user.correo,
        id: user.id
    }
    const token = await jwt.sign(userToken, SECRET, { expiresIn: 5000 });
    res.json({ token });
});




module.exports = usuarioRouter;