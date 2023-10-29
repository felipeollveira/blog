const knex = require('knex')({

    client: 'pg',
    connection: {
        user: '',
        host: '',
        database: '',
        password: '',
        
    },
    
})

module.exports = knex