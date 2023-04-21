/* Import Module */
import { Sequelize } from "sequelize";
import db from "../config/database.js"

/* Menggunakan Module */
const {DataTypes} = Sequelize // deklarasi type data dari sequalize

/* Membuat tabel */
const Product = db.define('product',{
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING, // untuk menyimpan url (ankes gambar)
},
{
    freezeTableName: true
})

export default Product; // export tabel agar bisa dipakai di controllers

/* Methos Product Controller */
(async() => {
    await db.sync()
})();

