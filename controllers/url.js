const {nanoid} = require('nanoid');
const URL = require('../models/url')
async function handleGenerateNewShortURL(req, res){
    const body= req.body;
    if(!body.url) return res.status(400).json({error: 'url is require'})
    
    const shortId = nanoid(8);
    
     await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory:[],
        createdBy:req.user._id,
    } )
return res.render("home",
    {id: shortId,

    });

}
async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;4
    const result = await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
}