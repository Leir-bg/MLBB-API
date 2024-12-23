require('dotenv').config()

module.exports = {
    apikey: process.env.API_KEY,
    port: process.env.PORT || 8000,
    datapath: process.env.DATASET,
    datafiles: {
        heroes: 'hero-meta-final.json',
        items: 'item-meta-final.json',
        emblems: 'emblem-meta-final.json'
    }
}