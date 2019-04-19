<h4 align="center"}>
MySql DB Usage with Sequelize ORM
</h4>


#### Frameworks / Libraries

* [Twitter Bootstrap] - Great UI boilerplate for modern web apps
* [ExpressJS] - Fast node.js network app framework
* [Sequelize] - Node.js ORM for PostgreSQL, MySQL, SQLite and MSSQL.

#### Development

This app requires [Node.js](https://nodejs.org/) v8+ to run.

1. Clone the repository. 
2. Set up an Local MySql connection
3. Create a mysql database - 'db_temp'

```sh
$ cd mysql-db
$ npm i
```
4. Create ```config/config.json``` file similar to ```config/config.example.json```and set correct database credentials and dialect. 
```
$ npx sequelize db:migrate
$ npm start
```
Navigate to http://localhost:3000/ in a browser of your choice.

#### License
This project is under MIT License

#### Author
<a href="https://github.com/kumaran-14" title="kumaran-14">Kumaran</a> | 2019

Made with :heart:

   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [ExpressJS]: <https://expressjs.com>
   [Sequelize]: <https://www.npmjs.com/package/sequelize>
