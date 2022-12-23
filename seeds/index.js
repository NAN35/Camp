const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers')
const Campground = require('../models/campground');

const MONGODB_URI = 'mongodb+srv://mongo:Akshay35@cluster0.jdlkxve.mongodb.net/yelp-camp?retryWrites=true&w=majority'

async function main() {
    await mongoose.connect(MONGODB_URI);
    console.log('Database Connected');
}

main().catch(err => console.log(err));

// const sample = array => array[Math.floor(Math.random() * array.legth)];
const sample = array => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 2500 + 1000);
        const camp = new Campground({
            //MY USER ID
            author: '638741de99798ff58d0149a1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, magnam! Tenetur minus corporis deleniti, obcaecati facere fugiat, esse quis veniam totam delectus adipisci? Pariatur omnis consequatur voluptatem autem voluptates hic.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude,cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dsjfi2afq/image/upload/v1670740144/YelpCamp/yetb4trt6rqbalarr9zt.jpg',
                    filename: 'YelpCamp/yetb4trt6rqbalarr9zt'
                },
                {
                    url: 'https://res.cloudinary.com/dsjfi2afq/image/upload/v1670740144/YelpCamp/djdosyyjxqrotr196cz4.jpg',
                    filename: 'YelpCamp/djdosyyjxqrotr196cz4'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})