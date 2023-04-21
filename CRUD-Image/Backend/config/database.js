import { Sequelize } from "sequelize";

const db = new Sequelize('lp_crudimage_sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db