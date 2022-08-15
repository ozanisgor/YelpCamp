const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true }, { useCreateIndex: true }, { useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: '62d6c0c7c7d659fa282c6ca9',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price: Math.floor(Math.random() * 20) + 10,
      geometry: {
        type: 'Point',
        coordinates: [26.693735, 39.31726]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dvakrjz9o/image/upload/v1659870807/YelpCamp/olvnrey3ptpvf7jj41qo.jpg',
          filename: 'YelpCamp/olvnrey3ptpvf7jj41qo'
        },
        {
          url: 'https://res.cloudinary.com/dvakrjz9o/image/upload/v1659870813/YelpCamp/zl1zbiej96t49pehl5dr.jpg',
          filename: 'YelpCamp/zl1zbiej96t49pehl5dr'
        },
        {
          url: 'https://res.cloudinary.com/dvakrjz9o/image/upload/v1659870818/YelpCamp/nulnrisq7n5uepqfy5sd.jpg',
          filename: 'YelpCamp/nulnrisq7n5uepqfy5sd'
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
