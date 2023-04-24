/* Import Module Sequelize */
import { Sequelize } from "sequelize";

/* Membuat var db (database) */
const db = new Sequelize('lp_crudimage_sequelize', 'root', '', { // megnhubungkan ke databse dengan menggunakan sequalize
    host: 'localhost',
    dialect: 'mysql'
})
// conts var = new Sequelize('nama database','root','password', {'host','dialect})


/* Export Variabel */
export default db