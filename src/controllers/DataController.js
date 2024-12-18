const path = require('path')
const fs = require('fs')
const DATA_PATH = require('../config.js').datapath

class DataController{
    serveData(filename){
        let filepath

        try{
            filepath = path.join(DATA_PATH, filename)
        }
        catch(e){
            return Promise.reject({message: 'File not found', status: 404})
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

    // filterData(message, query){
    //     const message_data = message.data
    //     const params = Object.keys(query)
    //     const param_length = params.length

    //     if(param_length === 1){
    //         switch(params[0]){
    //             case 'emblem_name':
    //                 return message_data.filter(item => item.emblem_name.toLowerCase() === query.emblem_name.toLowerCase())
    //         }
    //     }
    // }
}

module.exports = new DataController()