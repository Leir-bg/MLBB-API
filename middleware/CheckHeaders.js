function checkHeaders(req, res, next){
    const api_key = req.headers['mlbb-api-key']

    if(!api_key){
        return res.status(401).send('Unauthorized')
    }

    if(api_key !== process.env.API_KEY){
        return res.status(403).send('Invalid API key')
    }

    next()
}

module.exports = {checkHeaders}