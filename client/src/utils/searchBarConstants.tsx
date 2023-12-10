export type Category = {
    name: string;
    img: string;
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
  ];
  
  export { categoryData };
  