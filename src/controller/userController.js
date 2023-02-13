const knex = require('../../mysql/db/knex');

export const getAllUsers = (req, res) => {
    knex.transaction(function(trx) {
    knex.select()
    .from('users')
    .transacting(trx)
    .then(function(users){
        res.send(users)
    })
    .then(trx.commit)
    .catch(trx.rollback);
});
};

export const createUser = (req, res) => {
    knex.transaction(function(trx) {
    knex('users').insert({
        name: req.body.name,
        email: req.body.email
    })
    .transacting(trx)
    .then(function(users){
        knex.select().from('users').transacting(trx).then(function(users){
            res.send(users)
        });
    })
    .then(trx.commit)
    .catch(trx.rollback);
});
};

export const getUserById = (req, res) => {
    knex.transaction(function(trx) {
    knex.select()
        .from('users')
        .where('id', req.params.id)
        .transacting(trx)
        .then(function(users){
        res.send(users)
    })
    .then(trx.commit)
    .catch(trx.rollback);
});
    // logger.info('This is an info log!');
    // logger.warn('This is a warn log!');
};

export const updateUserById = (req, res) => {
    knex.transaction(function(trx) {
    knex('users').update({
        name: req.body.name,
        email: req.body.email
    })
    .where('id', req.params.id)
    .transacting(trx)
    .then(function(users){
        knex.select().from('users').transacting(trx).then(function(users){
            res.send(users)
        });
    })
    .then(trx.commit)
    .catch(trx.rollback);
});
};

export const deleteUserById = (req, res) => {
    knex.transaction(function(trx) {
    
    knex('users')
    .del()
    .where('id', req.params.id)
    .transacting(trx)
    .then(function(users){
        knex.select().from('users').transacting(trx).then(function(users){
            res.send(users)
        });
    })
    .then(trx.commit)
    .catch(trx.rollback);
});
};