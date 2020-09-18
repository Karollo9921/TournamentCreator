const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new mongoose.Schema({
    discipline: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8)
    },
    lastEdit: {
        type: String,
        default: null
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    players: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        }
    ]
 });
 
 module.exports = mongoose.model('Tournament', tournamentSchema);
