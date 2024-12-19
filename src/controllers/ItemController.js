const path = require('path')
const fs = require('fs')

class ItemController{
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
                return message.filter(item => {
                    return queries.id.some(id => item.mlid === id)
                })
            }
            else{
                return message.filter(item => item.id === queries.id)
            }
        }
    }
}

module.exports = new ItemController()