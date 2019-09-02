// {
//   "development": {
//     "username": "root",
//     "password": "root",
//     "database": "poli",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   }
// }

module.exports = {
  username: 'root',
  password: 'root',
  database: 'poli',
  host: '127.0.0.1',
  dialect: 'mysql',
  timezone: '-03:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "-03:00"
  },
  define: {
    freezeTableName: true
  },
}