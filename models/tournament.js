const fs = require('fs');
const path = require('path');


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

    saveToJSON() {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'tournaments.json'
        );
        fs.readFile(p, (err, fileContent) => {
            let tournaments = [];
            if (!err) {
                tournaments = JSON.parse(fileContent);  
            }    
            tournaments.push(this);
            fs.writeFile(p, JSON.stringify(tournaments), (err) => {
                if (err) {
                    console.log(err); 
                }                    
            });
        });
    }

    static displayFromJSON(cb) {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'tournaments.json'
        );
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                cb(JSON.parse(fileContent));
            } else {
                cb([]);
            }
            
        })
    }
};

