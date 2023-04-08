const pdf = require('pdf-creator-node');
const fs = require("fs");
var path = require("path");
const uuid = require('uuid');
const QRCode = require('qrcode');
const HTMLParser = require('node-html-parser');
const moment = require('moment');


const PdfGenerator = async (token, Event, User) => {
    // Read HTML Template
    const templatePath = path.resolve(__dirname, './assets/template.html');
    const html = fs.readFileSync(templatePath, "utf8");
    let fileName = uuid.v4() + ".pdf";
    const root = HTMLParser.parse(html);
    
    QRCode.toString(`https://localhost:8080/api/ticket/check/${token}`,{type:'svg'}, function (err, url) {
        const div = root.getElementById('qrcode');
        div.set_content(url)
    })

    const options = {
        format: "A4",
        orientation: "portrait",
        border: "5mm",
        childProcessOptions: {
            env: {
              OPENSSL_CONF: '/dev/null',
            },
        }
    };
    const data = [{
        name: User.fullname,
        event: Event.name,
        date: moment(Event.startDateTime).format('MMMM Do YYYY'),
        time: moment(Event.startDateTime).format('h:mm a'),
        location: Event.region
    }];
    const document = {
        html: root.toString(),
        data: {
            data: data,
        },
        path: `${path.resolve(__dirname, './assets/PDFs')}/${fileName}`,
        type: "",
    };

    const {filename} = await pdf.create(document, options);
    return filename;
}

module.exports = PdfGenerator;