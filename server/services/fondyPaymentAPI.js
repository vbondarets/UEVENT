const merchantConfig = require('../merchantConfig.json');
const crypto = require('crypto');
const axios = require('axios');

const paymentService = async (order_id, order_desc, amount, currency) =>{
    const url = "https://pay.fondy.eu/api/checkout/redirect/";
    const orderBody = {
        order_id: order_id,
        merchant_id: merchantConfig.merchantId,
        order_desc: order_desc,
        amount: amount,
        currency: currency
    }
    const orederKeys = Object.keys(orderBody).sort((a, b) => {
        if(a < b){
            return 1;
        }
        else if(a > b){
            return -1;
        }
        return 0;
    })
    const signatureString = orederKeys.map((value) => orderBody[value]).join("|");
    const params = {
        order_id: order_id,
        merchant_id: merchantConfig.merchantId,
        order_desc: order_desc,
        signature: crypto.createHash('sha1').update(`${merchantConfig.paymentKey}|${signatureString}`).digest('hex'),
        amount: amount,
        currency: currency
    };
    return params;
}

module.exports = paymentService;