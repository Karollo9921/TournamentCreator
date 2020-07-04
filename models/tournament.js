const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'tournaments.json'
);

module.exports = 

class Tournament {
    constructor(discipline, type, description) {
        this.id = Date.now();
        this.discipline = discipline;
        this.type = type;
        this.description = description;
        this.date = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                    + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8);
        this.lastEdit = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                    + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8);
    }

    saveToJSON() {
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

    static editTour(id, discipline, type, description) {
        return new Promise((resolve, reject) => {
            fs.readFile(p, (err, fileContent) => {
                let tournaments = [];
                if (!err) {
                    tournaments = JSON.parse(fileContent.toString());  
                }
                let newTournaments = tournaments.map((tour) => {
                    if (tour.id === id) {
                        return {
                            id: tour.id,
                            discipline: discipline,
                            type: type,
                            description: description,
                            date: tour.date,
                            lastEdit: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                                    + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8)
                        }
                    } else {
                        return tour
                    }
                })
                fs.writeFile(p, JSON.stringify(newTournaments), (err) => {
                    if (err) {
                        console.log(err); 
                    }                    
                });
                resolve();
            })
        })
    }

    static deleteTour(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(p, (err, fileContent) => {
                let tournaments = [];
                if (!err) {
                    tournaments = JSON.parse(fileContent.toString());  
                }
                let newTournaments = tournaments.filter((tour) => {return tour.id !== id})
                fs.writeFile(p, JSON.stringify(newTournaments), (err) => {
                    if (err) {
                        console.log(err); 
                    }                    
                });
                console.log(newTournaments);
                resolve();
            })
        })
    }

    static async displayFromJSON(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                cb(JSON.parse(fileContent));
            } else {
                cb([]);
            }
        })
    }
};

