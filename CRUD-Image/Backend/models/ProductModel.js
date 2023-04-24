/* Import Module */
import { Sequelize } from "sequelize";
import db from "../config/database.js"
import Users from "./UserModel.js";

/* Menggunakan Module */
const {DataTypes} = Sequelize // deklarasi type data dari sequalize

/* Membuat tabel */
const Product = db.define('product',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    image: DataTypes.STRING,
    url: DataTypes.STRING, // untuk menyimpan url (ankes gambar)
    // Tabel product relasi ke User
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},
{
    freezeTableName: true
})

/* Membuat user */
Users.hasMany(Product); // satu user dapat menginput banyak product
Product.belongsTo(Users, { // set data
    foreignKey: 'userId'
});

export default Product; // export tabel agar bisa dipakai di controllers
(async() => {
    await db.sync()
})();


