const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground')
const {places,descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/camp-review')

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('Database connected');
})

const sample = (arr)=>{
    return arr[Math.floor(Math.random()*arr.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0;i<50;i++){
        const ran = Math.floor(Math.random()*1000);
        const camp = new Campground({
            location:`${cities[ran].city}, ${cities[ran].state}`,
            title:`${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();

    }
}

seedDB().then(()=>{
    db.close();
});