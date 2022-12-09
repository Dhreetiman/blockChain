const axios = require("axios")
const coinModel = require("../models/coinModel")

const coin = async (req, res) => {
    try {
        let header1 = req.header('Authorization')
        let accessToken = "88fedaca-8f7c-424e-bf47-67b1460ff25d"
        if (!header1) {return res.status(400).send({status: false, message: "API key in header is required"})}
        if (header1 != `Bearer ${accessToken}`) return res.status(401).send({status:" false", message: "Unauthorized"})
        
        let options = {
            method: 'Get',
            url: 'https://api.coincap.io/v2/assets',

        }
        let result = await axios(options);
        
        let coins = result.data.data
        let sortedCoin = coins.sort((a,b)=> a.changePercent24Hr - b.changePercent24Hr)
        let coinData = await coinModel.insertMany(sortedCoin)

        res.status(200).send({status: true, data: sortedCoin})
     
        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            msg: err.message
        })
    }
}

module.exports = {coin}