const express = require('express');
const app = express();
const fs = require('fs');


app.use(express.static('public'));


app.use(express.json());


app.post('/submit', function (req, res) {

    var formData = req.body;

    if (!formData.username || !formData.country || !formData.message) {
        res.sendStatus(400);
        return;
    }


    fs.readFile('data.json', function (error, data) {
        if (error) {
            console.error('Error reading data file:', error);
            res.sendStatus(500);
        } else {

            var existingData = JSON.parse(data);


            formData.id = (existingData.length + 1).toString();


            existingData.push(formData);


            var jsonData = JSON.stringify(existingData);


            fs.writeFile('data.json', jsonData, function (error) {
                if (error) {
                    console.error('Error writing data file:', error);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});


app.get('/data', function (req, res) {
    fs.readFile('data.json', 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading data file:', err);
            res.sendStatus(500);
            const entries = JSON.parse(data);
            res.json(entries);
        }
    });
});


app.listen(3002, function () {
    console.log('Server is running on port 3002');
});
