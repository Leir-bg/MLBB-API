const path = require('path')
const fs = require('fs')

class EmblemController{
    serve(filename){
        let filepath

        try{
            filepath = path.join(process.env.DATASET, filename)
        }
        catch(e){
            return Promise.reject({error: 'File not found', status: 404})
        }

        return new Promise((resolve, reject) => {
            fs.readFile(filepath, 'utf8', (err, data) => {
                if(err){
                    reject({message: err, status: 404})
                }
                else{
                    resolve({message: JSON.parse(data), status: 200})
                }
            })
        })
    }

    fetch(message, queries){
        return new Promise((resolve, reject) => {
            let fd

            if(queries?.id){
                fd = this.matchID(message, queries)
            }
            else{
                fd = this.matchDetail(message, queries)
            }

            if(fd){
                resolve(fd)
            }
            else{
                reject({message: 'No data found', status: 404})
            }
        })
    }

    matchID(message, queries){
        const query_length = Object.keys(queries).length

        if(query_length === 1){
            if(Array.isArray(queries.id)){
                return message.filter(emblem => {
                    return queries.id.some(id => emblem.id === id)
                })
            }
            else{
                return message.filter(emblem => emblem.id === queries.id)
            }
        }
    }

    matchDetail(message, queries){
        const query_length = Object.keys(queries).length

        // TODO: implement this after the new emblem data is ready
        /* if(query_length === 1){
            if(queries?.tier){
                if(queries.tier === 'all'){
                    
                }
                else{

                }
            }
            else if(queries?.name){
                if(queries.name === 'all'){

                }
                else{

                }
            }
        } */
    }
}

module.exports = new EmblemController()