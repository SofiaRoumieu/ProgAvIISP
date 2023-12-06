const { connect } = require('mongoose');
const { DB_URI } = require('../utils/config');


const conectarDB = async () => {
    try {
        return connect(DB_URI);
    } catch (error) { }
}


conectarDB()
    .then((result) => {
        console.log("DB Conectada");
    })
    .catch((err) => {
        console.log(err.mesage);
    })