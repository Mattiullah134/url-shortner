const shortid = require("shortid");
const URL = require("../models/Url");
async function handleGenerateShortUrl(req, res) {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl) {
            res.status(400).json({ success: false, message: 'Url is required' })

        } else {
            const shortId = shortid(8);
            await URL({
                shortId,
                redirectUrl: originalUrl,
                visitHistory: []
            }).save();
            res.status(200).json({ success: true, message: 'url id generate succesfully', shortId })
        }
    } catch (error) {
        res.status(401).json({ success: false, message: 'Something went wrong' })
    }
}
async function handleGetAnaltics(req, res) {
    try {
        const shortid = req.params.shortid;
        const result = await URL.findOne({ shortId: shortid });
        console.log(result);
        res.status(200).json({ success: true, totalClicks: result.visitHistory.length, visitHistory: result.visitHistory })
    } catch (error) {
        res.status(401).json({ success: false, message: 'Something went wrong' })

    }
}

module.exports = {
    handleGenerateShortUrl, handleGetAnaltics
}