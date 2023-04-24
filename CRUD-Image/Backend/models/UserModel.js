/* Import Module */
import { Sequelize } from "sequelize";
import db from "../config/database.js"

/* Menggunakan Module */
const {DataTypes} = Sequelize // deklarasi type data dari sequalize

/* Membuat tabel */
const User = db.define('user',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, // tidak boleh kosong
        validate:{ // validasi tidak boleh kosong (null dan empty string)
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false, // tidak boleh kosong
        validate:{ // validasi tidak boleh kosong (null dan empty string)
            notEmpty: true,
            len: [3, 100] // jumlah karakter minimal 3 dan max 100 karakter
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false, // tidak boleh kosong
        validate:{ // validasi tidak boleh kosong (null dan empty string)
            notEmpty: true,
            isEmail: true  // harus ada @
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false, // tidak boleh kosong
        validate:{ // validasi tidak boleh kosong (null dan empty string)
            notEmpty: true
        }
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false, // tidak boleh kosong
        validate:{ // validasi tidak boleh kosong (null dan empty string)
            notEmpty: true
        }
    },
    image: DataTypes.STRING,
    url: DataTypes.STRING // untuk menyimpan url (ankes gambar)
},
{
    freezeTableName: true
})

export default User; // export tabel agar bisa dipakai di controllers
(async() => {
    await db.sync()
})();

