const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Note extends Model {
    static get tableName() {
        return 'notes';
    }
}

module.exports = Note;
