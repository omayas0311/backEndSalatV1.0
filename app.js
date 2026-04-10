const express = require('express');
const data = require("./annee.json");
require('dotenv').config();
const app = express();
const port = process.env.port || 3001;
let nbrRequest=1;

app.use((req,res,next)=>{
    console.log(nbrRequest+" request at "+ new Date().getHours()+" h "+ new Date().getMinutes()+" mn");
    nbrRequest++;
    next();
});

app.get('/api/salat/bydate/:mois/:jour', (req, res,next) => {
    const jour = req.params.jour;
    const mois = req.params.mois;
    const h = data.find(x => x.jour == jour && x.mois == mois);
    if(!h){
        next();
    }
    res.status(200).json(h)
});

app.get('/api/salat/bymonth/:mois', (req, res) => {

    const mois = req.params.mois;
    const h = data.filter(x => x.mois == mois);
    if(!h){
        next();
    }
    res.status(200).json(h)
});

app.get('/api/salat/byday', (req, res) => {
    const jour = new Date().getDate();
    const mois = new Date().getMonth() + 1;


    const h = data.find(x => x.jour == jour && x.mois == mois);

    res.status(200).json(h)
});

// Mw not find

app.use((req,res)=>{
    res.status(404).json({message:"erreur de saisie mois ou jour"});
});


app.listen(port, () => {

    console.log("à l'ecoute au port: "+port);
});