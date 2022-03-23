var def_page = 'index.html'

console.log("Starting Server...");

function provideContent(request, response) {
    var qry = require('url').parse(request.url, true);
    var flag = qry.pathname === null || qry.pathname === "/"

    require('fs').readFile(("./client/" + (flag ? def_page : qry.pathname)), function (err, data) {
        if (err) {
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
            return response.end("404 Not Found");
        }
        response.writeHead(200, {});
        response.write(data);
        return response.end();
    });
}

function interpretRequest(request, response, flag) {
    if (request.method == 'POST') {
        let data = '';
        request.on('data', chunk => data += chunk)
        request.on('end', () => {
            var entries = data.split("&");
            var cleanedEntryList = new Array();

            var flag1 = entries[4].substring(entries[4].lastIndexOf("=") + 1) === "" &&
                entries[5].substring(entries[5].lastIndexOf("=") + 1) === "" &&
                entries[6].substring(entries[6].lastIndexOf("=") + 1) === "" &&
                entries[7].substring(entries[7].lastIndexOf("=") + 1) === "";

            if (!flag1) {
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                return response.end("404 Not Found");
            }

            for (var entry of entries) {
                if (entry.substring(entry.lastIndexOf("=") + 1) === null) continue;
                cleanedEntryList.push(entry.substring(entry.lastIndexOf("=") + 1))
            }

            var msg = `You have received a request from a client, please view their information below:\n\tName Provided: ${cleanedEntryList[0]} ${cleanedEntryList[1]}\n\tEmail Provided: ${cleanedEntryList[2]}\n\tNumber Provided: ${cleanedEntryList[3]}\n\tDetails Provided: ${cleanedEntryList[8]}`;

            var sender = require('nodemailer').createTransport({
                service: 'gmail',
                auth: {
                    user: 'dsi.it.mail.client@gmail.com',
                    pass: "')(F)GVd6e=3[\"d2fB^n3h'n>UMMzC,+z7wpx%<aXdMUZe?*'VWF2Lug{spFV53!r3%+c[:8a*kE\":>PJ)4}yR<Vvd6Y~e8#;?C4"
                }
            });

            var mailConfiguration = {
                from: 'dsi.it.mail.client@gmail.com',
                to: 'admin@dsi-it.net',
                subject: 'DSI IT Mail Client: ! New Form Sent, Info Below. !',
                text: msg
            };
            
            
            sender.sendMail(mailConfiguration);
            provideContent(request, response);
        })
    }
}

require('http').createServer(function (req, res) {
    provideContent(req, res);
    interpretRequest(req, res);
}).listen(80);

console.log("Server has been initialized.");
