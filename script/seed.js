'use strict'

const User = require('../server/db/models/User')
const Item = require('../server/db/models/Item')
const  db = require("../server/db/db")
const {green, red} = require('chalk')



const items = [
  {
    name: "Protein Powder",
    description: "High-quality protein powder for muscle growth and recovery.",
    price: 30,
    imageUrl: "https://www.example.com/protein_powder.jpg"
  },
  {
    name: "Pre-Workout Supplement",
    description: "Boost your energy and focus before workouts with this powerful pre-workout formula.",
    price: 40,
    imageUrl: "https://www.example.com/preworkout_supplement.jpg"
  },
  {
    name: "Creatine Monohydrate",
    description: "Enhance your strength and power with this pure creatine monohydrate powder.",
    price: 20,
    imageUrl: "https://www.example.com/creatine_monohydrate.jpg"
  },
  {
    name: "BCAA Tablets",
    description: "Support muscle recovery and prevent muscle breakdown with these BCAA tablets.",
    price: 25,
    imageUrl: "https://www.example.com/bcaa_tablets.jpg"
  },
  {
    name: "Mass Gainer",
    description: "Achieve your weight gain goals with this calorie-dense mass gainer shake.",
    price: 50,
    imageUrl: "https://www.example.com/mass_gainer.jpg"
  },
  {
    name: "Fish Oil Capsules",
    description: "Get your essential omega-3 fatty acids with these high-potency fish oil capsules.",
    price: 15,
    imageUrl: "https://www.example.com/fish_oil_capsules.jpg"
  },
  {
    name: "Multivitamin Tablets",
    description: "Ensure you meet your daily nutrient needs with these comprehensive multivitamin tablets.",
    price: 10,
    imageUrl: "https://www.example.com/multivitamin_tablets.jpg"
  },
  {
    name: "Glutamine Powder",
    description: "Support muscle recovery and immune function with this pure glutamine powder.",
    price: 13,
    imageUrl: "https://www.example.com/glutamine_powder.jpg"
  },
  {
    name: "Weightlifting Belt",
    description: "Provide extra support to your lower back during heavy weightlifting sessions with this durable weightlifting belt.",
    price: 35,
    imageUrl: "https://www.example.com/weightlifting_belt.jpg"
  },
  {
    name: "Energy Bars",
    description: "Fuel your workouts and keep hunger at bay with these delicious and nutritious energy bars.",
    price: 3,
    imageUrl: "https://www.example.com/energy_bars.jpg"
  }
];

const users = [
  {
    username: "johnDoe",
    password: "password123",
    imageUrl: null
  },
  {
    username: "janeSmith",
    password: "qwerty",
    imageUrl: null
  },
  {
    username: "mikeJohnson",
    password: "abc123",
    imageUrl: null
  },
  {
    username: "sarahBrown",
    password: "password456",
    imageUrl: null
  },
  {
    username: "alexWilson",
    password: "pass123",
    imageUrl: null
  }
];



/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
const seed = async () => {
  try {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users (old code)
  // const users = await Promise.all([
  //   User.create({ username: 'cody', password: '123' }),
  //   User.create({ username: 'murphy', password: '123' }),
  // ])

  //Creating Users
   await Promise.all(users.map(user => {
  return User.create(user);
}))
  // Creating Items
  await Promise.all(items.map(item => {
    return Item.create(item);
  }));

console.log(green('Seeding success!'))

} 
catch (err) {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
}
};

seed()
 
module.exports = seed
