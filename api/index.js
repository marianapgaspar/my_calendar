const http = require('http');
const data = require("./agendas.json")
const URL = require("url")
const fs = require('fs')
const path = require('path')

function writeFile(cb){
    fs.writeFile(
        path.join(__dirname, "agendas.json"), 
        JSON.stringify(data,null,2),
        err=>{
            if(err) throw err
            cb(JSON.stringify({message: "ok"}))
        }    
    )
}

http.createServer((req, res) => {
    const {date, text, del} = URL.parse(req.url, true).query
    res.writeHead(200, {
        'Access-Control-Allow-Origin': "*"
    })
    if(!date || !text){
        return res.end(JSON.stringify(data))
    }
    if (del){
        data.agendas = data.agendas.filter(item => String(item.text) !== String(text))
        return writeFile((message)=>{
            res.end(message)
        })        
    }
    data.agendas.push({text, date})
    return  writeFile((message) => res.end(message))
}).listen(3000, () => console.log("Api is running"))