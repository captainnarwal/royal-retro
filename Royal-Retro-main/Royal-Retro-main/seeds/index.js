if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptors,description}=require('./seedHelpers');
const Restaurant=require('../models/restaurant');

const dbUrl=process.env.DB_URL || 'mongodb://localhost:27017/retro'
// const dbUrl=process.env.DB_URL
// const dbUrl = 'mongodb://localhost:27017/retro';

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample=(array)=>array[Math.floor(Math.random()*array.length)];



const seedDB=async()=>{
    await Restaurant.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000=Math.floor(Math.random()*400);
        const price=Math.floor(Math.random()*20)+10;
        const retro=new Restaurant({
            // Your User ID
            // author: '6299b8cc773a8b0d7d1487a0',
            author: '6294d5d7766da1c2de52237f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:`${sample(description)}`,
            price,
            geometry:{ 
                type : "Point",
                coordinates : [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
             },
            images: [
                {
                    url: 'https://res.cloudinary.com/dragonmas-cloud/image/upload/v1654342621/Retro/omfmulnzmnpg10iqjdiq.jpg',
                    filename: 'Retro/omfmulnzmnpg10iqjdiq',
                },
                {
                    url: 'https://res.cloudinary.com/dragonmas-cloud/image/upload/v1654342637/Retro/ixxp7igbjmvos17bpeju.jpg',
                    filename: 'Retro/ixxp7igbjmvos17bpeju',
                },
                {
                    url: 'https://res.cloudinary.com/dragonmas-cloud/image/upload/v1654342643/Retro/zohitf99graav9zg59vw.jpg',
                    filename: 'Retro/zohitf99graav9zg59vw',
                },
                {
                    url: 'https://res.cloudinary.com/dragonmas-cloud/image/upload/v1654342485/Retro/y3mucuwnpt5z8pc9xekl.jpg',
                    filename: 'Retro/y3mucuwnpt5z8pc9xekl',
                },
                {
                    url: 'https://res.cloudinary.com/dragonmas-cloud/image/upload/v1654336871/Retro/pibnk7gkgx8ebii1xyol.jpg',
                    filename: 'Retro/pibnk7gkgx8ebii1xyol',
                },
                {
                    url: 'https://res.cloudinary.com/dragonmas-cloud/image/upload/v1654336936/Retro/ojaskazhddlreoi0ufqv.jpg',
                    filename: 'Retro/ojaskazhddlreoi0ufqv',
                }
              ]
        })
        await retro.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})

// seedDB();