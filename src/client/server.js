const { createServer } =  require("lwr");
const path = require('path');
//const express =  require("express");
const jsforceAjaxProxy = require("jsforce-ajax-proxy");

const PORT = parseInt(process.env.PORT || "3000", 10);
const SERVER_MODE = "development" === process.env.NODE_ENV ? "dev" : "prod";


//const app = express();
//const site_path = path.join(__dirname,'..','..','site');

/*
app.use(express.static(site_path));
app.all("/proxy/?*", jsforceAjaxProxy({ enableCORS: true }));
console.log('__dirname',site_path);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
*/


// Create the LWR App Server
const lwrServer = createServer({
    serverMode: SERVER_MODE,
    port: PORT,
});
// Get the internal express app
const expressApp = lwrServer.getInternalServer("express");
expressApp.all("/proxy/?*", jsforceAjaxProxy({ enableCORS: true }));

// Start the server
lwrServer
.listen(({ port, serverMode }) => {
    console.log(`✅ App listening on port ${port} in ${serverMode} mode!`);
    console.log(`Url http://localhost:${port}`);
})
.catch((err) => {
    console.error(err);
    process.exit(1);
});
