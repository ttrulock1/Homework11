// goal is to create server on port that can listen and respond to requests.

// express part with all the beginning code for server.js
const express= require('express')
const app= express()
const fs= require("fs")
const path= require("path")

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(express.static("public"))

// we are creating HTML ROUTES. GET REQUESTS works on local host/ NOTES
app.get("/notes",function(request,response){
    response.sendFile(path.join(__dirname,"./public/notes.html"))
})

// this is get function for api routing. This is the routing for my express application.
app.get("/api/notes",function(request,response){
    response.sendFile(path.join(__dirname,"./db/db.json"))
})
app.post("/api/notes",function(request,response){
    const newnote=request.body
    newnote.id=Date.now()
    const data=fs.readFileSync("./db/db.json")
    const json=JSON.parse(data)
    json.push(newnote)
    fs.writeFileSync('./db/db.json',JSON.stringify(json))
    response.send()
})

app.delete("/api/notes/:id",function(request,response){
    const id=Number(request.params.id)
    const data=fs.readFileSync("./db/db.json")
    const json=JSON.parse(data)
    const newjson=json.filter(function(note){
        return note.id !== id
    })
    fs.writeFileSync('./db/db.json',JSON.stringify(newjson))
    response.send()
})



// App.listen part (node server to test)
app.listen(3001,function(){
    console.log("Yes, it is working")
})