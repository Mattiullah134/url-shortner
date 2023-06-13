const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const connectToMongoo = require('./connect');
const URL = require('./models/Url');
const dotenv = require('dotenv');
const port = 8000;
dotenv.config('./.env')

app.use(express.json());
app.use('/url', urlRoute);
app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate({ shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );
        console.log(entry);
        res.redirect(entry.redirectUrl).json()
    } catch (error) {

    }
})
app.listen(port, () => {
    connectToMongoo(process.env.MONGOO_URI);
    console.log('app listening at port 8000');
})