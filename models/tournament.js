const tournaments = [];

module.exports = 

class Tournament {
    constructor(discipline, type, description) {
        this.id = Date.now();
        this.discipline = discipline;
        this.type = type;
        this.description = description;
        this.date = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                    + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8)
    }

};

