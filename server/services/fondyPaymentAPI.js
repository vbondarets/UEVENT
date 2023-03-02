const merchantConfig = require('../merchantConfig.json');
const crypto = require('crypto');
const axios = require('axios');

const paymentService = async (order_id, order_desc, amount, currency, merchant_data) => {
    const url = "https://pay.fondy.eu/api/checkout/url/";
    const orderBody = {
        order_id: order_id,
        merchant_id: merchantConfig.merchantId,
        order_desc: order_desc,
        amount: amount,
        currency: currency
    }
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
    console.log(signatureString);
    const params = {
        order_id: order_id,
        merchant_id: merchantConfig.merchantId,
        order_desc: order_desc,
        amount: amount,
        currency: currency,
        merchant_data: merchant_data
    };
    const signature = crypto.createHash('sha1');
    signature.update(`${merchantConfig.paymentKey}|${signatureString}`);

    const { data } = await axios.post(url, {
        request: {
            ...params,
            signature: signature.digest('hex'),
        }
    })

    // axios.post(url, {
    //     request: {
    //         ...params,
    //         signature: signature.digest('hex')
    //     }
    // }).then((resolve) => {
    //     console.log(resolve.data);
    //     return resolve.data;
    // }).catch((err) => {
    //     console.log(err);
    //     return resolve.data;
    // })
    return data;
}

module.exports = paymentService;