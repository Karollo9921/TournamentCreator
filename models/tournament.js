const getDB = require('../util/database.js').getDB;
const mongoDB = require('mongoDB');

const ObjectId = mongoDB.ObjectId;

module.exports = 

class Tournament {
    constructor(discipline, type, description) {
        // this.id = Date.now();
        this.discipline = discipline;
        this.type = type;
        this.description = description;
        this.date = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                    + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8);
        this.lastEdit = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                    + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8);
    }

    saveToMongoDB() {
        const db = getDB();
        return db.collection('tournaments')
            .insertOne(this)
            .then()
            .catch((err) => {
                console.log(err);
            })
    }

    static editTour(id, discipline, type, description) {
        const db = getDB();
        db.collection('tournaments')
            .updateOne({_id: new ObjectId(id)},
                {$set: {
                    discipline: discipline,
                    type: type,
                    description: description,
                    lastEdit: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                                + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8)
                }})
    }

    static deleteTour(id) {
        const db = getDB();
        db.collection('tournaments').deleteOne({_id: new ObjectId(id)});
    }

    static displayFromMongoDB() {
        const db = getDB();
        return db
            .collection('tournaments')
            .find()
            .toArray()
            .then((tours) => {
                return tours;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

