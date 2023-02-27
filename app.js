const express = require('express');
const favicon = require('serve-favicon');
const session = require("cookie-session");

const app = express()

// défini le moteur de rendu
app.set('view engine', 'ejs');

// défine le dossier ou se trouve les vues
app.set('views',__dirname + "/views");

app.use(express.urlencoded({ extended: true }));

// pour déclarer un dossier public
app.use(express.static(__dirname + '/public'));

// Afficher le favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// ajoute la gestion de la session dans l'application
app.use(session({secret: 'secretpass'}));

// http://localhost:8090/
app.get('/', (req, res) => {
    res.render('home', {
        firstname: "",
        lastname: "",
        login: req.session.login,
        password: req.session.password
    })});
    //res.send(Bonjour ${req.params.firstname} ${req.params.lastname});

// http://localhost:8090/page1
app.get("/page1", (req, res) => {
    res.send("Page 1");
});

app.get("/home", (req, res) => {
    res.send("home");
});

app.get('/:firstname/:lastname', (req, res) => {
    //res.send Acceuil
    res.render('home', {
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        login: req.session.login,
        password: req.session.password
        
    });
    //res.send(`Bonjour ${req.params.firstname} ${req.params.lastname}`);
});

app.get('/:firstname/:lastname', (req, res) => {
    //res.send Acceuil
    res.render('bj', {
        firstname: req.params.firstname,
        lastname: req.params.lastname,
    });
    //res.send(`Bonjour ${req.params.firstname} ${req.params.lastname}`);
});

// affiche la vue du formulaire
app.get('/register', (req, res) => {
    res.render("register");
})

// Cas par défaut si les autres urls n'ont pas matché
app.use((req, res) => {
    res.status(404);    
    //res.send("Page introuvable");
    res.render('404');
});

// démarre le serveur sur le port 8090
app.listen(8000, () => {
    console.log("Le serveur est démarré sur le port 8000");
});