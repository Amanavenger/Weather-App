const express = require('express');
const request = require("request");
const path = require('path')
const hbs = require('hbs');
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//!Define Path for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//!Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//!Setup static directory to serve
app.use(express.static(publicDirectory));



app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Aman"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Aman "
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is for Help",
        title: "Help",
        name: "Aman"
    })
})

app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "Error Address must Be Entres!!!",
        });
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error,
            })
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address,
            });

        }
        );
    })
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: "Article Not Found",
        title: "404",
        name: "Danthe"
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        message: "Page Not Found!!",
        title: "404",
        name: "Danthe",
    });
});

app.listen(3000, () => {
    console.log("server started!!");
})