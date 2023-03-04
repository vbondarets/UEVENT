const merchantConfig = require('../merchantConfig.json');
const crypto = require('crypto');
const axios = require('axios');
const JwtGenerator = require('../helpers/jwtGenerators/jwtGenerator');

const paymentService = async (order_id, order_desc, amount, currency, merchant_data) => {
    const url = "https://pay.fondy.eu/api/checkout/url/";
    const orderBody = {
        order_id: order_id,
        merchant_id: merchantConfig.merchantId,
        order_desc: order_desc,
        amount: amount,
        currency: currency,
        merchant_data: JSON.stringify(merchant_data)
    }

    const seqToken = JwtGenerator(orderBody);
    merchant_data.seqToken = seqToken;
    orderBody.merchant_data = JSON.stringify(merchant_data);
    
    const orederKeys = Object.keys(orderBody).sort((a, b) => {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        return 0;
    })
    const signatureString = orederKeys.map((value) => orderBody[value]).join("|");

    const signature = crypto.createHash('sha1');
    signature.update(`${merchantConfig.paymentKey}|${signatureString}`);
    const { data } = await axios.post(url, {
        request: {
            ...orderBody,
            signature: signature.digest('hex'),
        }
    })
    return data;
}

module.exports = paymentService;