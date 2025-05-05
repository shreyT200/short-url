const express = require('express');
const urlRoute = require('./routes/url');
const { connectToMongoDb } = require('./connect');
const app = express();
const cookieParser = require('cookie-parser');
const URL = require('./models/url');
const userRoute = require('./routes/user')
const PORT= 8001;
const path = require('path')
const staticRoute = require('./routes/staticRouter');
const{restrictToLoggedinUserOnly, checkAuth} = require('./middleware/auth')

connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=> console.log('Mongo is connected'))
.catch((error)=> console.error('Error connecting to mongo') )

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.set('views', path.resolve('./views')); 
app.use(express.json());

app.use('/url', restrictToLoggedinUserOnly ,urlRoute);
app.use('/user', userRoute);
app.use('/',checkAuth, staticRoute);
app.get('/:shortId', async (req, res)=>{

    
const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate({

    shortId,
}, { 
    $push:{
    visitHistory:{
        timestamps: Date.now(),
    },
}
}
)
if(!entry){
    return res.status(404).json({msg: 'not found'});
}
res.redirect(entry.redirectURL);
})
app.listen(PORT, ()=> console.log(`Server started at port ${PORT} `));