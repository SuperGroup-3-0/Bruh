'use strict'

const { db, User, Item, Translation } = require("../server/db")
const {green, red} = require('chalk')

const translations = [
  //each entry in the seed must have two entries in translations, one for name and one for description 
  {
    key: "protein_powder_name",
    en: "Protein Powder",  
    uk: "Протеїновий порошок"
  },

  {
    key: "protein_powder_description",
    en: "High-quality protein powder for muscle growth and recovery", 
    uk: "Високоякісний протеїновий порошок для зростання та відновлення м'язів."   
  },

  {
    key: "pre_workout_supplement_name", 
    en: "Pre-Workout Supplement",
    uk: "Добавка перед тренуванням"
  },

  {
    key: "pre_workout_supplement_description",
    en: "Boost your energy and focus before workouts with this powerful pre-workout formula",
    uk: "Підвищать свою енергію та зосередженість перед тренуваннями за допомогою цієї потужної формули перед тренуванням"
  },

  {
    key: "creatine_monohydrate_name", 
    en: "Creatine Monohydrate",
    uk: "Креатин моногідрат"
  },

  {
    key: "creatine_monohydrate_description", 
    en: "Enhance your strength and power with this pure creatine monohydrate powder",
    uk: "Зміцніть свою силу та витримку за допомогою цього чистого порошку моногідрату креатину"
  },

  {
    key: "bcaa_tablets_name", 
    en: "BCAA Tablets",
    uk: "Таблетки АЗРЛ"
  },

  {
    key: "bcaa_tablets_description", 
    en: "Support muscle recovery and prevent muscle breakdown with these BCAA tablets",
    uk: "Підтримуйте відновлення м’язів та запобігайте зменшенню маси м’язів за допомогою цих таблеток АЗРЛ"
  },

  {
    key: "mass_gainer_name", 
    en: "Mass Gainer",
    uk: "Гейнер маси"
  },

  {
    key: "mass_gainer_description", 
    en: "Achieve your weight gain goals with this calorie-dense mass gainer shake",
    uk: "Досягніть своїх цілей щодо збільшення ваги за допомогою цього високо-калорійного коктейлю для набору маси"
  },

  {
    key: "fish_oil_capsules_name", 
    en: "Fish Oil Capsules",
    uk: "Риб'ячий жир в капсулах"
  },

  {
    key: "fish_oil_capsules_description", 
    en: "Get your essential omega-3 fatty acids with these high-potency fish oil capsules",
    uk: "Отримайте незамінні омега-3 жирні кислоти з цими високоефективними капсулами риб’ячого жиру"
  },

  {
    key: "multivitamin_tablets_name", 
    en: "Multivitamin Tablets",
    uk: "Мультивітаміни в капсулах"
  },

  {
    key: "multivitamin_tablets_description", 
    en: "Ensure you meet your daily nutrient needs with these comprehensive multivitamin tablets",
    uk: "Забезпечте задоволення своїх щоденних потреб в поживних речовинах з цими комплексними мультивітамінними таблетками."
  },

  {
    key: "glutamine_powder_name", 
    en: "Glutamine Powder",
    uk: "Порошок глутаміну"
  },

  {
    key: "glutamine_powder_description", 
    en: "Support muscle recovery and immune function with this pure glutamine powder",
    uk: "Підтримайте відновлення м'язів та імунну функцію за допомогою цього чистого порошку глутаміну"
  },

  {
    key: "weightlifting_belt_name", 
    en: "Weightlifting Belt",
    uk: "Пояс для жиму штанги"
  },

  {
    key: "weightlifting_belt_description", 
    en: "Provide extra support to your lower back during heavy weightlifting sessions with this durable weightlifting bel",
    uk: "Надайте додаткову підтримку нижній частині спини під час важких тренувань з використанням цього міцного пояса для жиму штанги."
  },

  {
    key: "energy_bars_name", 
    en: "Energy Bars",
    uk: "Енергетичні батончики"
  },

  {
    key: "energy_bars_description", 
    en: "Fuel your workouts and keep hunger at bay with these delicious and nutritious energy bars",
    uk: "Заряджайте свої тренування та підтримуйте ситість з цими смачними та поживними енергетичними батончиками."
  },

  // {
  //   key: "john_doe",
  //   en: "John Doe",
  //   uk: "Іван Доу"
  // },

  // {
  //   key: "jane_smith",
  //   en: "Jane Smith",
  //   uk: "Олена Петренко"
  // },

  // {
  //   key: "mike_johnson",
  //   en: "Mike Johnson",
  //   uk: "Михайло Іваненко"
  // },

  // {
  //   key: "sarah_brown",
  //   en: "Sarah Brown",
  //   uk: "Софія Бровко"
  // },

  // {
  //   key: "alex_wilson",
  //   en: "Alex Wilson",
  //   uk: "Олексій Вільсон "
  // }

]

const items = [
  {
    name_key: "protein_powder_name",
    description_key: "protein_powder_description",
    price: 30,
    imageUrl: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    name_key: "pre_workout_supplement_name",
    description_key: "pre_workout_supplement_description",
    price: 40,
    imageUrl: "https://media.istockphoto.com/id/1059674488/photo/glass-of-sports-shake-next-to-ripe-banana-and-dry-powder.jpg?s=1024x1024&w=is&k=20&c=ng3vQT3RfakfXOQq-Lg4RRr75OEff5Sn6it1QRaUcLU="
  },
  {
    name_key: "creatine_monohydrate_name",
    description_key: "creatine_monohydrate_description",
    price: 20,
    imageUrl: "https://media.istockphoto.com/id/870981830/photo/sport-supplement-or-vitamin-with-a-lemon-slice-sport-nutrition-concept.jpg?s=1024x1024&w=is&k=20&c=vhNNguynxFjBg_kYg1ytWTCWFlpAEf8qmngZlos5XVo="
  },
  {
    name_key: "bcaa_tablets_name",
    description_key: "bcaa_tablets_description",
    price: 25,
    imageUrl: "https://images.unsplash.com/photo-1610937146735-47e4602511c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    name_key: "mass_gainer_name",
    description_key: "mass_gainer_description",
    price: 50,
    imageUrl: "https://media.istockphoto.com/id/1167013749/photo/protein-shake-bottle-powder-and-bars.jpg?s=1024x1024&w=is&k=20&c=wzwJL9RNFBcOvGkVYTEySNFk0xhK7y350gCPX1NwylE="
  },
  {
    name_key: "fish_oil_capsules_name",
    description_key: "fish_oil_capsules_description",
    price: 15,
    imageUrl: "https://media.istockphoto.com/id/1347857819/photo/fish-oil-capsules-and-diet-rich-in-omega-3.jpg?s=1024x1024&w=is&k=20&c=JOc4rIfxRoXuZ9rnQbzskLu7mJIB4u994F8KXyDoyNo="
  },
  {
    name_key: "multivitamin_tablets_name",
    description_key: "multivitamin_tablets_description",
    price: 10,
    imageUrl: "https://media.istockphoto.com/id/1368216051/photo/alternative-medicine-herbal-organic-capsule-with-vitamin-e-omega-3-fish-oil-mineral-drug-with.jpg?s=1024x1024&w=is&k=20&c=-CMiO8YTB9hlGBZHF7duZzg9axda5c6eU1jHVMa6OZM="
  },
  {
    name_key: "glutamine_powder_name",
    description_key: "glutamine_powder_description",
    price: 13,
    imageUrl: "https://media.istockphoto.com/id/1171808022/photo/whey-protein-powder.jpg?s=1024x1024&w=is&k=20&c=U0lDUAH7wKwiqcxvVxBbr6biWbofdsummZkCAl4CAB4="
  },
  {
    name_key: "weightlifting_belt_name",
    description_key: "weightlifting_belt_description",
    price: 35,
    imageUrl: "https://media.istockphoto.com/id/479894454/photo/dumbbell-with-belt-and-gloves.jpg?s=1024x1024&w=is&k=20&c=5a6zaXadg0Kb1OzpzQ1JVbFFJRqyD9n4HwRcXSCUZgM="
  },
  {
    name_key: "energy_bars_name",
    description_key: "energy_bars_description",
    price: 3,
    imageUrl: "https://media.istockphoto.com/id/185099151/photo/granola-bar.jpg?s=1024x1024&w=is&k=20&c=KKZPVIZcuADe50FisxpzKHhwMOrayAx7UGxPviS2B9w="
  }
];

const users = [
  {
    username: "john_doe",
    password: "password123",
  },
  {
    username: "jane_smith",
    password: "qwerty",
  },
  {
    username: "mike_johnson",
    password: "abc123",
  },
  {
    username: "sarah_brown",
    password: "password456",
  },
  {
    username: "alex_wilson",
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

  await Promise.all(translations.map((t) => {
    return Translation.create(t)
  }))

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
