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
    imageUrl: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    name: "Pre-Workout Supplement",
    description: "Boost your energy and focus before workouts with this powerful pre-workout formula.",
    price: 40,
    imageUrl: "https://media.istockphoto.com/id/1059674488/photo/glass-of-sports-shake-next-to-ripe-banana-and-dry-powder.jpg?s=1024x1024&w=is&k=20&c=ng3vQT3RfakfXOQq-Lg4RRr75OEff5Sn6it1QRaUcLU="
  },
  {
    name: "Creatine Monohydrate",
    description: "Enhance your strength and power with this pure creatine monohydrate powder.",
    price: 20,
    imageUrl: "https://media.istockphoto.com/id/870981830/photo/sport-supplement-or-vitamin-with-a-lemon-slice-sport-nutrition-concept.jpg?s=1024x1024&w=is&k=20&c=vhNNguynxFjBg_kYg1ytWTCWFlpAEf8qmngZlos5XVo="
  },
  {
    name: "BCAA Tablets",
    description: "Support muscle recovery and prevent muscle breakdown with these BCAA tablets.",
    price: 25,
    imageUrl: "https://images.unsplash.com/photo-1610937146735-47e4602511c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    name: "Mass Gainer",
    description: "Achieve your weight gain goals with this calorie-dense mass gainer shake.",
    price: 50,
    imageUrl: "https://media.istockphoto.com/id/1167013749/photo/protein-shake-bottle-powder-and-bars.jpg?s=1024x1024&w=is&k=20&c=wzwJL9RNFBcOvGkVYTEySNFk0xhK7y350gCPX1NwylE="
  },
  {
    name: "Fish Oil Capsules",
    description: "Get your essential omega-3 fatty acids with these high-potency fish oil capsules.",
    price: 15,
    imageUrl: "https://media.istockphoto.com/id/1347857819/photo/fish-oil-capsules-and-diet-rich-in-omega-3.jpg?s=1024x1024&w=is&k=20&c=JOc4rIfxRoXuZ9rnQbzskLu7mJIB4u994F8KXyDoyNo="
  },
  {
    name: "Multivitamin Tablets",
    description: "Ensure you meet your daily nutrient needs with these comprehensive multivitamin tablets.",
    price: 10,
    imageUrl: "https://media.istockphoto.com/id/1368216051/photo/alternative-medicine-herbal-organic-capsule-with-vitamin-e-omega-3-fish-oil-mineral-drug-with.jpg?s=1024x1024&w=is&k=20&c=-CMiO8YTB9hlGBZHF7duZzg9axda5c6eU1jHVMa6OZM="
  },
  {
    name: "Glutamine Powder",
    description: "Support muscle recovery and immune function with this pure glutamine powder.",
    price: 13,
    imageUrl: "https://media.istockphoto.com/id/1171808022/photo/whey-protein-powder.jpg?s=1024x1024&w=is&k=20&c=U0lDUAH7wKwiqcxvVxBbr6biWbofdsummZkCAl4CAB4="
  },
  {
    name: "Weightlifting Belt",
    description: "Provide extra support to your lower back during heavy weightlifting sessions with this durable weightlifting belt.",
    price: 35,
    imageUrl: "https://media.istockphoto.com/id/479894454/photo/dumbbell-with-belt-and-gloves.jpg?s=1024x1024&w=is&k=20&c=5a6zaXadg0Kb1OzpzQ1JVbFFJRqyD9n4HwRcXSCUZgM="
  },
  {
    name: "Energy Bars",
    description: "Fuel your workouts and keep hunger at bay with these delicious and nutritious energy bars.",
    price: 3,
    imageUrl: "https://media.istockphoto.com/id/185099151/photo/granola-bar.jpg?s=1024x1024&w=is&k=20&c=KKZPVIZcuADe50FisxpzKHhwMOrayAx7UGxPviS2B9w="
  }
];

const users = [
  {
    username: "John Doe",
    password: "password123",
  },
  {
    username: "Jane Smith",
    password: "qwerty",
  },
  {
    username: "Mike Johnson",
    password: "abc123",
  },
  {
    username: "Sarah Brown",
    password: "password456",
  },
  {
    username: "Alex Wilson",
    password: "pass123",
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
