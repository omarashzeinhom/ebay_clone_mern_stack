export type Category = {
  name: string;
  img: string;
  parent?: string;
};

export type Product = Category & {
  name: string;
  img: string;
  price: number;
  parent?: string;
};

const categoryData: Category[] = [
  {
    name: "Parts & accessories",
    parent: "Motors",
    img: "https://source.unsplash.com/featured/?car",
  },
  {
    name: "Cars & trucks",
    parent: "Motors",
    img: "https://source.unsplash.com/featured/?truck",
  },
  {
    name: "Motorcycles",
    parent: "Motors",
    img: "https://source.unsplash.com/featured/?motorcycle",
  },
  {
    name: "Other vehicles",
    parent: "Motors",
    img: "https://source.unsplash.com/featured/?vehicle",
  },
  {
    name: "Women",
    parent: "Clothing & Accessories",
    img: "https://source.unsplash.com/featured/?fashion",
  },
  {
    name: "Men",
    parent: "Clothing & Accessories",
    img: "https://source.unsplash.com/featured/?men",
  },
  {
    name: "Handbags",
    parent: "Clothing & Accessories",
    img: "https://source.unsplash.com/featured/?handbag",
  },
  {
    name: "Collectible Sneakers",
    parent: "Clothing & Accessories",
    img: "https://source.unsplash.com/featured/?sneakers",
  },
  {
    name: "Hunting Equipment",
    parent: "Sporting goods",
    img: "https://source.unsplash.com/featured/?hunting",
  },
  {
    name: "Golf Equipment",
    parent: "Sporting goods",
    img: "https://source.unsplash.com/featured/?golf",
  },
  {
    name: "Outdoor sports",
    parent: "Sporting goods",
    img: "https://source.unsplash.com/featured/?outdoors",
  },
  {
    name: "Cycling Equipment",
    parent: "Sporting goods",
    img: "https://source.unsplash.com/featured/?cycling",
  },
  {
    name: "Electronics",
    parent: "All Categories",
    img: "https://source.unsplash.com/featured/?electronics",
  },
  {
    name: "Computers, Tablets & Network Hardware",
    parent: "Electronics",
    img: "https://source.unsplash.com/featured/?computer",
  },
  {
    name: "Cell Phones, Smart Watches & Accessories",
    parent: "Electronics",
    img: "https://source.unsplash.com/featured/?phone",
  },
  {
    name: "Video Games & Consoles",
    parent: "Electronics",
    img: "https://source.unsplash.com/featured/?videogame",
  },
  {
    name: "Cameras & Photo",
    parent: "Electronics",
    img: "https://source.unsplash.com/featured/?camera",
  },
  {
    name: "Modular & Pre-Fabricated Buildings",
    parent: "Business & Industrial",
    img: "https://source.unsplash.com/featured/?building",
  },
  {
    name: "Test, Measurement & Inspection Equipment",
    parent: "Business & Industrial",
    img: "https://source.unsplash.com/featured/?measurement",
  },
  {
    name: "Heavy Equipment, Parts & Attachments",
    parent: "Business & Industrial",
    img: "https://source.unsplash.com/featured/?heavyequipment",
  },
  {
    name: "Business Services & Equipment",
    parent: "Business & Industrial",
    img: "https://source.unsplash.com/featured/?business",
  },
  {
    name: "Other business equipment & tools",
    parent: "Business & Industrial",
    img: "https://source.unsplash.com/featured/?tools",
  },
  {
    name: "Cash Machines & Banking Equipment",
    parent: "Financial Services",
    img: "https://source.unsplash.com/featured/?cashmachine",
  },
  {
    name: "Security Systems & Equipment",
    parent: "Financial Services",
    img: "https://source.unsplash.com/featured/?security",
  },
  {
    name: "Electrical Equipment",
    parent: "Financial Services",
    img: "https://source.unsplash.com/featured/?electrical",
  },
  {
    name: "Pharmacy Equipment",
    parent: "Healthcare",
    img: "https://source.unsplash.com/featured/?pharmacy",
  },
  {
    name: "Hospital Equipment",
    parent: "Healthcare",
    img: "https://source.unsplash.com/featured/?hospital",
  },
  {
    name: "Medical Lab Equipment",
    parent: "Healthcare",
    img: "https://source.unsplash.com/featured/?medicallab",
  },
  {
    name: "Pharmaceuticals & Supplies",
    parent: "Healthcare",
    img: "https://source.unsplash.com/featured/?pharmaceuticals",
  },
  {
    name: "Kitchen equipment",
    parent: "Household goods",
    img: "https://source.unsplash.com/featured/?kitchen",
  },
  {
    name: "Home decor & accessories",
    parent: "Household goods",
    img: "https://source.unsplash.com/featured/?homedecor",
  },
  {
    name: "Small appliances",
    parent: "Household goods",
    img: "https://source.unsplash.com/featured/?appliances",
  },
  {
    name: "Gardening equipment",
    parent: "Household goods",
    img: "https://source.unsplash.com/featured/?gardening",
  },
  {
    name: "Safety equipment",
    parent: "Household goods",
    img: "https://source.unsplash.com/featured/?safety",
  },
  {
    name: "Heating, Cooling & Ventilation",
    parent: "Household goods",
    img: "https://source.unsplash.com/featured/?hvac",
  },
  {
    name: "Audio equipment",
    parent: "Household goods",
    img: "https://source.unsplash.com/featured/?audio",
  },
  {
    name: "Storage equipment",
    parent: "Household goods",
    img: "https://source.unsplash.com/featured/?storage",
  },
  {
    name: "Instruments",
    parent: "Arts, crafts & Sewing",
    img: "https://source.unsplash.com/featured/?instruments",
  },
  {
    name: "Photography equipment",
    parent: "Arts, crafts & Sewing",
    img: "https://source.unsplash.com/featured/?photography",
  },
  {
    name: "Paintings",
    parent: "Arts, crafts & Sewing",
    img: "https://source.unsplash.com/featured/?paintings",
  },
  {
    name: "Drawing & painting supplies",
    parent: "Arts, crafts & Sewing",
    img: "https://source.unsplash.com/featured/?drawing",
  },
  {
    name: "Crafts & sewing",
    parent: "Arts, crafts & Sewing",
    img: "https://source.unsplash.com/featured/?crafts",
  },
  {
    name: "Gym & fitness equipment",
    parent: "Sports & Fitness",
    img: "https://source.unsplash.com/featured/?gym",
  },
  {
    name: "Exercise & fitness accessories",
    parent: "Sports & Fitness",
    img: "https://source.unsplash.com/featured/?exercise",
  },
  {
    name: "Cycling & Fitness bikes",
    parent: "Sports & Fitness",
    img: "https://source.unsplash.com/featured/?cyclingfitness",
  },
  {
    name: "Indoor & outdoor sports equipment",
    parent: "Sports & Fitness",
    img: "https://source.unsplash.com/featured/?sports",
  },
  {
    name: "Rackets & sports equipment",
    parent: "Sports & Fitness",
    img: "https://source.unsplash.com/featured/?rackets",
  },
  {
    name: "Hunting & Fishing equipment",
    parent: "Outdoors & Travel",
    img: "https://source.unsplash.com/featured/?huntingfishing",
  },
  {
    name: "Camping equipment",
    parent: "Outdoors & Travel",
    img: "https://source.unsplash.com/featured/?camping",
  },
  {
    name: "Boating & marine equipment",
    parent: "Outdoors & Travel",
    img: "https://source.unsplash.com/featured/?boating",
  },
  {
    name: "Cycling & Outdoor equipment",
    parent: "Outdoors & Travel",
    img: "https://source.unsplash.com/featured/?cyclingoutdoor",
  },
  {
    name: "Automotive equipment",
    parent: "Auto, Transport & Industrial",
    img: "https://source.unsplash.com/featured/?automotive",
  },
  {
    name: "Aviation equipment",
    parent: "Auto, Transport & Industrial",
    img: "https://source.unsplash.com/featured/?aviation",
  },
  {
    name: "Rail transport equipment",
    parent: "Auto, Transport & Industrial",
    img: "https://source.unsplash.com/featured/?railtransport",
  },
  {
    name: "Shipping & marine transport equipment",
    parent: "Auto, Transport & Industrial",
    img: "https://source.unsplash.com/featured/?shippingmarine",
  },
  {
    name: "Trucking & Transportation equipment",
    parent: "Auto, Transport & Industrial",
    img: "https://source.unsplash.com/featured/?truckingtransportation",
  },
  {
    name: "Machinery & Heavy Equipment",
    parent: "Auto, Transport & Industrial",
    img: "https://source.unsplash.com/featured/?machinery",
  },
  {
    name: "Wine & Beer making equipment",
    parent: "Kitchen & Cookware",
    img: "https://source.unsplash.com/featured/?winemaking",
  },
  {
    name: "Coffee & Tea making equipment",
    parent: "Kitchen & Cookware",
    img: "https://source.unsplash.com/featured/?coffeeteamaking",
  },
  {
    name: "Food preparation equipment",
    parent: "Kitchen & Cookware",
    img: "https://source.unsplash.com/featured/?foodpreparation",
  },
  {
    name: "Cookware & bakeware",
    parent: "Kitchen & Cookware",
    img: "https://source.unsplash.com/featured/?cookwarebakeware",
  },
  {
    name: "Dinnerware & tableware",
    parent: "Kitchen & Cookware",
    img: "https://source.unsplash.com/featured/?dinnerwaretableware",
  },
  {
    name: "Barware & Restaurant supplies",
    parent: "Kitchen & Cookware",
    img: "https://source.unsplash.com/featured/?barwarerestaurant",
  },
  {
    name: "Medical & healthcare equipment",
    parent: "Health & Personal Care",
    img: "https://source.unsplash.com/featured/?medicalhealthcare",
  },
  {
    name: "Pharmacy & drugstore supplies",
    parent: "Health & Personal Care",
    img: "https://source.unsplash.com/featured/?pharmacydrugstore",
  },
  {
    name: "Beauty & personal care equipment",
    parent: "Health & Personal Care",
    img: "https://source.unsplash.com/featured/?beauty",
  },
  {
    name: "Lab & scientific equipment",
    parent: "Health & Personal Care",
    img: "https://source.unsplash.com/featured/?labscientific",
  },
  {
    name: "Education & training equipment",
    parent: "Education & Training",
    img: "https://source.unsplash.com/featured/?educationtraining",
  },
  {
    name: "Learning & educational aids",
    parent: "Education & Training",
    img: "https://source.unsplash.com/featured/?learningeducationalaids",
  },
  {
    name: "Library & office equipment",
    parent: "Education & Training",
    img: "https://source.unsplash.com/featured/?libraryoffice",
  },
  {
    name: "Audio & video equipment",
    parent: "Professional & Technical",
    img: "https://source.unsplash.com/featured/?audiovideo",
  },
  {
    name: "Office equipment & supplies",
    parent: "Professional & Technical",
    img: "https://source.unsplash.com/featured/?officeequipment",
  },
  {
    name: "Industrial & maintenance equipment",
    parent: "Professional & Technical",
    img: "https://source.unsplash.com/featured/?industrialmaintenance",
  },
  {
    name: "Electronics & communication equipment",
    parent: "Professional & Technical",
    img: "https://source.unsplash.com/featured/?electronicscommunication",
  },
  {
    name: "Music Equipment",
    parent: "Arts & Entertainment",
    img: "https://source.unsplash.com/featured/?music",
  },

  {
    name: "Outdoor Recreation Equipment",
    parent: "Sports & Outdoors",
    img: "https://source.unsplash.com/featured/?outdoorrecreation",
  },

  {
    name: "Personal Transportation",
    parent: "Auto, Transport & Industrial",
    img: "https://source.unsplash.com/featured/?personaltransportation",
  },

  {
    name: "Computer & Office Equipment",
    parent: "Professional & Technical",
    img: "https://source.unsplash.com/featured/?computerofficeequipment",
  },
];

const productData: Product[] = [
  // Parts & accessories
  {
    name: "Wheel Bearing Kit",
    img: "https://source.unsplash.com/featured/?wheelbearingkit",
    price: 49.99,
    parent: "Parts & accessories",
  },
  {
    name: "Oil Filter",
    img: "https://source.unsplash.com/featured/?oilfilter",
    price: 24.99,
    parent: "Parts & accessories",
  },
  {
    name: "Air Filter",
    img: "https://source.unsplash.com/featured/?airfilter",
    price: 19.99,
    parent: "Parts & accessories",
  },

  // Cars & trucks
  {
    name: "Ford Mustang",
    img: "https://source.unsplash.com/featured/?fordmustang",
    price: 29.999,
    parent: "Cars & trucks",
  },
  {
    name: "Chevrolet Silverado",
    img: "https://source.unsplash.com/featured/?chevroletsilverado",
    price: 28.999,
    parent: "Cars & trucks",
  },
  {
    name: "Honda Accord",
    img: "https://source.unsplash.com/featured/?hondaaccord",
    price: 27.999,
    parent: "Cars & trucks",
  },
  {
    name: "Dodge Challenger",
    img: "https://source.unsplash.com/featured/?dodgeschallenger",
    price: 31.999,
    parent: "Cars & trucks",
  },
  {
    name: "Nissan Frontier",
    img: "https://source.unsplash.com/featured/?nissanfrontier",
    price: 26.999,
    parent: "Cars & trucks",
  },
  {
    name: "Toyota Camry",
    img: "https://source.unsplash.com/featured/?toyotacamry",
    price: 26.999,
    parent: "Cars & trucks",
  },
  {
    name: "Smart Thermostat",
    img: "https://source.unsplash.com/featured/?smartthermostat",
    price: 99.99,
    parent: "Electronics & communication equipment",
  },
  {
    name: "Rain Gear",
    img: "https://source.unsplash.com/featured/?raingear",
    price: 69.99,
    parent: "Outdoor Recreation Equipment",
  },
  {
    name: "Drone with Camera",
    img: "https://source.unsplash.com/featured/?dronewithcamera",
    price: 149.99,
    parent: "Audio & video equipment",
  },
  {
    name: "Automotive Brake Pad",
    img: "https://source.unsplash.com/featured/?automotivebrakepad",
    price: 19.99,
    parent: "Personal Transportation",
  },
  {
    name: "Home Theater System",
    img: "https://source.unsplash.com/featured/?hometheatersystem",
    price: 799.99,
    parent: "Audio & video equipment",
  },
  {
    name: "Musical Instrument Case",
    img: "https://source.unsplash.com/featured/?musicalinstrumentcase",
    price: 39.99,
    parent: "Music Equipment",
  },
  {
    name: "Dress Shoes",
    img: "https://source.unsplash.com/featured/?dressshoes",
    price: 89.99,
    parent: "Fashion & Clothing",
  },
  {
    name: "Comfy Couch",
    img: "https://source.unsplash.com/featured/?comfycouch",
    price: 699.99,
    parent: "Furniture & Decor",
  },
  {
    name: "3D Printer",
    img: "https://source.unsplash.com/featured/?3dprinter",
    price: 799.99,
    parent: "Industrial & maintenance equipment",
  },
  {
    name: "Art Paints Set",
    img: "https://source.unsplash.com/featured/?artpaintsset",
    price: 59.99,
    parent: "Arts & Entertainment",
  },
  {
    name: "Exercise Ball",
    img: "https://source.unsplash.com/featured/?exerciseball",
    price: 29.99,
    parent: "Fitness & Exercise",
  },
  {
    name: "Dog Leash",
    img: "https://source.unsplash.com/featured/?dogleash",
    price: 9.99,
    parent: "Pet Supplies",
  },
  {
    name: "Computer Keyboard",
    img: "https://source.unsplash.com/featured/?computerkeyboard",
    price: 79.99,
    parent: "Computer & Office Equipment",
  },
  {
    name: "Kitchen Sink",
    img: "https://source.unsplash.com/featured/?kitchensink",
    price: 249.99,
    parent: "Kitchen & Cookware",
  },
  {
    name: "Running Shoes",
    img: "https://source.unsplash.com/featured/?runningshoes",
    price: 89.99,
    parent: "Sports & Outdoors",
  },
  {
    name: "Dermatology Machine",
    img: "https://source.unsplash.com/featured/?dermatologymachine",
    price: 599.99,
    parent: "Medical & healthcare equipment",
  },
  {
    name: "Homework Desk",
    img: "https://source.unsplash.com/featured/?homeworkdesk",
    price: 249.99,
    parent: "Education & Training",
  },
  {
    name: "Tennis Racket",
    img: "https://source.unsplash.com/featured/?tennisracket",
    price: 99.99,
    parent: "Sports & Outdoors",
  },
  {
    name: "Diving Gear",
    img: "https://source.unsplash.com/featured/?divinggear",
    price: 299.99,
    parent: "Outdoor Recreation Equipment",
  },
  {
    name: "Camera Lens",
    img: "https://source.unsplash.com/featured/?cameralens",
    price: 249.99,
    parent: "Audio & video equipment",
  },
  {
    name: "Beach Tent",
    img: "https://source.unsplash.com/featured/?beachtent",
    price: 149.99,
    parent: "Outdoor Recreation Equipment",
  },
  {
    name: "Pool Cleaner",
    img: "https://source.unsplash.com/featured/?poolcleaner",
    price: 299.99,
    parent: "Indoor Living & Home",
  },
  {
    name: "Barbecue Grill",
    img: "https://source.unsplash.com/featured/?barbecuegrill",
    price: 249.99,
    parent: "Outdoor Living & Home",
  },
  {
    name: "Yoga Mat",
    img: "https://source.unsplash.com/featured/?yogamat",
    price: 39.99,
    parent: "Fitness & Exercise",
  },
  {
    name: "Meditation Cushion",
    img: "https://source.unsplash.com/featured/?meditationcushion",
    price: 19.99,
    parent: "Relaxation & Meditation",
  },
  {
    name: "Laser Cutter",
    img: "https://source.unsplash.com/featured/?lasercutter",
    price: 799.99,
    parent: "Industrial & maintenance equipment",
  },
  {
    name: "Car Alarm System",
    img: "https://source.unsplash.com/featured/?caralarmsystem",
    price: 99.99,
    parent: "Personal Transportation",
  },
  {
    name: "Motion Sensor Security Camera",
    img: "https://source.unsplash.com/featured/?motionsensorsecuritycamera",
    price: 199.99,
    parent: "Audio & video equipment",
  },
  {
    name: "Electric Shaver",
    img: "https://source.unsplash.com/featured/?electricshaver",
    price: 39.99,
    parent: "Personal Grooming & Health",
  },
  {
    name: "Heated Towel Radiator",
    img: "https://source.unsplash.com/featured/?heatedtowelradiator",
    price: 79.99,
    parent: "Bath & Shower",
  },
  {
    name: "Digital Audio Player",
    img: "https://source.unsplash.com/featured/?digitalaudioplayer",
    price: 69.99,
    parent: "Audio & video equipment",
  },
  {
    name: "Headphones",
    img: "https://source.unsplash.com/featured/?headphones",
    price: 199.99,
    parent: "Audio & video equipment",
  },
  {
    name: "Laptop Bag",
    img: "https://source.unsplash.com/featured/?laptopbag",
    price: 59.99,
    parent: "Computer & Office Equipment",
  },
  {
    name: "Camera Tripod",
    img: "https://source.unsplash.com/featured/?cameratripod",
    price: 79.99,
    parent: "Audio & video equipment",
  },
  {
    name: "Rolling Suitcase",
    img: "https://source.unsplash.com/featured/?rollingsuitcase",
    price: 99.99,
    parent: "Luggage & Travel",
  },
  {
    name: "E-Bike",
    img: "https://source.unsplash.com/featured/?ebike",
    price: 499.99,
    parent: "Sports & Outdoors",
  },
  {
    name: "Handyman Tool Set",
    img: "https://source.unsplash.com/featured/?handymantoolset",
    price: 249.99,
    parent: "Industrial & maintenance equipment",
  },
  {
    name: "Table Tennis Racket",
    img: "https://source.unsplash.com/featured/?pingpongracket",
    price: 79.99,
    parent: "Sports & Outdoors",
  },
  {
    name: "Baseball Glove",
    img: "https://source.unsplash.com/featured/?baseballglove",
    price: 69.99,
    parent: "Sports & Outdoors",
  },
  {
    name: "Rock Climbing Shoes",
    img: "https://source.unsplash.com/featured/?rockclimbingshoes",
    price: 149.99,
    parent: "Outdoor Recreation Equipment",
  },
  {
    name: "Hockey Stick",
    img: "https://source.unsplash.com/featured/?hockeystick",
    price: 79.99,
    parent: "Sports & Outdoors",
  },
  {
    name: "Football",
    img: "https://source.unsplash.com/featured/?football",
    price: 29.99,
    parent: "Sports & Outdoors",
  },
  {
    name: "Paintball Guns",
    img: "https://source.unsplash.com/featured/?paintballguns",
    price: 399.99,
    parent: "Sports & Outdoors",
  },
  {
    name: "Hiking Boots",
    img: "https://source.unsplash.com/featured/?hikingboots",
    price: 199.99,
    parent: "Outdoor Recreation Equipment",
  },
  {
    name: "Kayak",
    img: "https://source.unsplash.com/featured/?kayak",
    price: 699.99,
    parent: "Water Sports & Outdoors",
  },
  {
    name: "Paddle Board",
    img: "https://source.unsplash.com/featured/?paddleboard",
    price: 799.99,
    parent: "Water Sports & Outdoors",
  },
  {
    name: "Kitesurfing Board",
    img: "https://source.unsplash.com/featured/?kitesurfingboard",
    price: 1299.99,
    parent: "Water Sports & Outdoors",
  },
  {
    name: "Stand Up Paddleboard",
    img: "https://source.unsplash.com/featured/?supboard",
    price: 799.99,
    parent: "Water Sports & Outdoors",
  },
  {
    name: "Personal Watercraft",
    img: "https://source.unsplash.com/featured/?jetski",
    price: 5999.99,
    parent: "Water Sports & Outdoors",
  },
  {
    name: "Drone",
    img: "https://source.unsplash.com/featured/?drone",
    price: 2499.99,
    parent: "Aerospace & Drone",
  },
  {
    name: "Wi-Fi Hotspot",
    img: "https://source.unsplash.com/featured/?wifihotspot",
    price: 249.99,
    parent: "Computer & Office Equipment",
  },
  {
    name: "Fireworks Kit",
    img: "https://source.unsplash.com/featured/?fireworkskit",
    price: 49.99,
    parent: "Entertainment & Toys",
  },
  {
    name: "Oscillating Humidifier",
    img: "https://source.unsplash.com/featured/?oscillatinghumidifier",
    price: 99.99,
    parent: "Indoor Living & Home",
  },
  {
    name: "LED Grow Light",
    img: "https://source.unsplash.com/featured/?ledgrowlight",
    price: 49.99,
    parent: "Indoor Living & Home",
  },
  {
    name: "Dimmable Wall Switch",
    img: "https://source.unsplash.com/featured/?dimmablewallswitch",
    price: 24.99,
    parent: "Indoor Living & Home",
  },
  {
    name: "Hardware Organizer",
    img: "https://source.unsplash.com/featured/?hardwareorganizer",
    price: 29.99,
    parent: "Indoor Living & Home",
  },
  {
    name: "Home Theater System",
    img: "https://source.unsplash.com/featured/?hometheatersystem",
    price: 2499.99,
    parent: "Entertainment & Toys",
  },
  {
    name: "Sound Bar",
    img: "https://source.unsplash.com/featured/?soundbar",
    price: 599.99,
    parent: "Entertainment & Toys",
  },
  {
    name: "PlayStation",
    img: "https://source.unsplash.com/featured/?playstation",
    price: 399.99,
    parent: "Entertainment & Toys",
  },
  {
    name: "Xbox",
    img: "https://source.unsplash.com/featured/?xbox",
    price: 399.99,
    parent: "Entertainment & Toys",
  },
];

export { categoryData, productData };
