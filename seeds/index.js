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
    for(let i = 0;i<200;i++){
        const ran = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'632856f12ffbc92be49e0f93',
            location:`${cities[ran].city}, ${cities[ran].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [cities[ran].longitude, cities[ran].latitude]
            },
            description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci iure modi enim. Velit doloribus laborum totam fugit dicta laudantium fugiat. In animi quis culpa repellat quam ab voluptates obcaecati itaque!',
            price:price,
            images: [
                {
                  url: 'https://res.cloudinary.com/djfjaky5w/image/upload/v1664273276/CampReview/kj1uswzzhouwfdihsrft.jpg',
                  filename: 'CampReview/kj1uswzzhouwfdihsrft'
                },
                {
                  url: 'https://res.cloudinary.com/djfjaky5w/image/upload/v1664273273/CampReview/zg07q9lmwumv3d1usoi2.jpg',
                  filename: 'CampReview/zg07q9lmwumv3d1usoi2'
                }
            ]
        })
        await camp.save();

    }
}

seedDB().then(()=>{
    db.close();
});