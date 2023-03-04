const pdf = require('pdf-creator-node');
const fs = require("fs");
var path = require("path");
const uuid = require('uuid');
const QRCode = require('qrcode');
const HTMLParser = require('node-html-parser');


const PdfGenerator = async (token) => {
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
        // header: {
        //     height: "45mm",
        //     contents: '<div id="author" style="text-align: center;">Author:</div>'
        // },
        // footer: {
        //     height: "5mm",
        //     contents: {
        //         first: 'Cover page',
        //         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        //         last: 'Last Page'
        //     }
        // }
    };
    const data = [{
        name: "Shyam",
        age: "26",
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