const mysql  = require('mysql'),
      uuid   = require('uuid/v1'),
      config = require('../../config.server');

module.exports = class HanlderDAO {

    constructor() {
        this.connection = mysql.createConnection({
          host     : config.DB_HOST,
          user     : config.DB_USER,
          password : config.DB_PASSWORD,
          database : config.DB_DATABASE_NAME,
        });
    }

    run( request , values = {}) {
        return new Promise(( resolve , reject ) => {
            this.connection.connect();
            this.connection.query({
                sql: request,
                values: values
            }, (err, rows, fields) => {
                if (err) {
                    reject( err );
                } else {
                    resolve( rows );
                }
            });
            this.connection.end();
        });
    }

    get( entity , conditions ) {
        let values,
        request = 'SELECT * FROM `' + entity + '` ';

        if( conditions ) {
            let attributes = Object.keys(conditions),
            values         = Object.keys(conditions).map( attribute => conditions[attribute]);

            request += 'WHERE 1 AND ' + (  attributes.join(' = ? AND ')) + ' = ?';
        }

        return this.run( request , values );
    }

    save( entity , values ) {
        if( !values.id ) {
            values.id = uuid();
        }
        return this.run( 'INSERT INTO `' + entity + '` SET ?' , values );
    }

}