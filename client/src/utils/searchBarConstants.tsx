
export type Category = {
    name: string;
    img: string;
    parent?: string;
  };

  
const categoryData: Category[] = [
  {
    name: "Parts & accessories",
    parent: "Motors",
    img: "path_to_your_image_directory/parts_and_accessories.jpg",
  },
  {
    name: "Cars & trucks",
    parent: "Motors",
    img: "path_to_your_image_directory/cars_and_trucks.jpg",
  },
  {
    name: "Motorcycles",
    parent: "Motors",
    img: "path_to_your_image_directory/motorcycles.jpg",
  },
  {
    name: "Other vehicles",
    parent: "Motors",
    img: "path_to_your_image_directory/other_vehicles.jpg",
  },
  {
    name: "Women",
    parent: "Clothing & Accessories",
    img: "path_to_your_image_directory/women.jpg",
  },
  {
    name: "Men",
    parent: "Clothing & Accessories",
    img: "path_to_your_image_directory/men.jpg",
  },
  {
    name: "Handbags",
    parent: "Clothing & Accessories",
    img: "path_to_your_image_directory/handbags.jpg",
  },
  {
    name: "Collectible Sneakers",
    parent: "Clothing & Accessories",
    img: "path_to_your_image_directory/collectible_sneakers.jpg",
  },
  {
    name: "Hunting Equipment",
    parent: "Sporting goods",
    img: "path_to_your_image_directory/hunting_equipment.jpg",
  },
  {
    name: "Golf Equipment",
    parent: "Sporting goods",
    img: "path_to_your_image_directory/golf_equipment.jpg",
  },
  {
    name: "Outdoor sports",
    parent: "Sporting goods",
    img: "path_to_your_image_directory/outdoor_sports.jpg",
  },
  {
    name: "Cycling Equipment",
    parent: "Sporting goods",
    img: "path_to_your_image_directory/cycling_equipment.jpg",
  },
  {
    name: "Electronics",
    parent: "All Categories",
    img: "path_to_your_image_directory/electronics.jpg",
  },
  {
    name: "Computers, Tablets & Network Hardware",
    parent: "Electronics",
    img: "path_to_your_image_directory/computers_tablets_network_hardware.jpg",
  },
  {
    name: "Cell Phones, Smart Watches & Accessories",
    parent: "Electronics",
    img: "path_to_your_image_directory/cell_phones_smart_watches_accessories.jpg",
  },
  {
    name: "Video Games & Consoles",
    parent: "Electronics",
    img: "path_to_your_image_directory/video_games_consoles.jpg",
  },
  {
    name: "Cameras & Photo",
    parent: "Electronics",
    img: "path_to_your_image_directory/cameras_photo.jpg",
  },
  {
    name: "Modular & Pre-Fabricated Buildings",
    parent: "Business & Industrial",
    img: "path_to_your_image_directory/modular_prefabricated_buildings.jpg",
  },
  {
    name: "Test, Measurement & Inspection Equipment",
    parent: "Business & Industrial",
    img: "path_to_your_image_directory/test_measurement_inspection_equipment.jpg",
  },
  {
    name: "Heavy Equipment, Parts & Attachments",
    parent: "Business & Industrial",
    img: "path_to_your_image_directory/heavy_equipment_parts_attachments.jpg",
  },
  {
    name: "Business Services & Equipment",
    parent: "Business & Industrial",
    img: "path_to_your_image_directory/business_services_equipment.jpg",
  },
  {
    name: "Other business equipment & tools",
    parent: "Business & Industrial",
    img: "path_to_your_image_directory/other_business_equipment_tools.jpg",
  },
  {
    name: "Cash Machines & Banking Equipment",
    parent: "Financial Services",
    img: "path_to_your_image_directory/cash_machines_banking_equipment.jpg",
  },
  {
    name: "Security Systems & Equipment",
    parent: "Financial Services",
    img: "path_to_your_image_directory/security_systems_equipment.jpg",
  },
  {
    name: "Electrical Equipment",
    parent: "Financial Services",
    img: "path_to_your_image_directory/electrical_equipment.jpg",
  },
  {
    name: "Pharmacy Equipment",
    parent: "Healthcare",
    img: "path_to_your_image_directory/pharmacy_equipment.jpg",
  },
  {
    name: "Hospital Equipment",
    parent: "Healthcare",
    img: "path_to_your_image_directory/hospital_equipment.jpg",
  },
  {
    name: "Medical Lab Equipment",
    parent: "Healthcare",
    img: "path_to_your_image_directory/medical_lab_equipment.jpg",
  },
  {
    name: "Pharmaceuticals & Supplies",
    parent: "Healthcare",
    img: "path_to_your_image_directory/pharmaceuticals_supplies.jpg",
  },
  {
    name: "Kitchen equipment",
    parent: "Household goods",
    img: "path_to_your_image_directory/kitchen_equipment.jpg",
  },
  {
    name: "Home decor & accessories",
    parent: "Household goods",
    img: "path_to_your_image_directory/home_decor_accessories.jpg",
  },
  {
    name: "Small appliances",
    parent: "Household goods",
    img: "path_to_your_image_directory/small_appliances.jpg",
  },
  {
    name: "Gardening equipment",
    parent: "Household goods",
    img: "path_to_your_image_directory/gardening_equipment.jpg",
  },
  {
    name: "Safety equipment",
    parent: "Household goods",
    img: "path_to_your_image_directory/safety_equipment.jpg",
  },
  {
    name: "Heating, Cooling & Ventilation",
    parent: "Household goods",
    img: "path_to_your_image_directory/heating_cooling_ventilation.jpg",
  },
  {
    name: "Audio equipment",
    parent: "Household goods",
    img: "path_to_your_image_directory/audio_equipment.jpg",
  },
  {
    name: "Storage equipment",
    parent: "Household goods",
    img: "path_to_your_image_directory/storage_equipment.jpg",
  },
  {
    name: "Instruments",
    parent: "Arts, crafts & Sewing",
    img: "path_to_your_image_directory/instruments.jpg",
  },
  {
    name: "Photography equipment",
    parent: "Arts, crafts & Sewing",
    img: "path_to_your_image_directory/photography_equipment.jpg",
  },
  {
    name: "Paintings",
    parent: "Arts, crafts & Sewing",
    img: "path_to_your_image_directory/paintings.jpg",
  },
  {
    name: "Drawing & painting supplies",
    parent: "Arts, crafts & Sewing",
    img: "path_to_your_image_directory/drawing_painting_supplies.jpg",
  },
  {
    name: "Crafts & sewing",
    parent: "Arts, crafts & Sewing",
    img: "path_to_your_image_directory/crafts_sewing.jpg",
  },
  {
    name: "Gym & fitness equipment",
    parent: "Sports & Fitness",
    img: "path_to_your_image_directory/gym_fitness_equipment.jpg",
  },
  {
    name: "Exercise & fitness accessories",
    parent: "Sports & Fitness",
    img: "path_to_your_image_directory/exercise_fitness_accessories.jpg",
  },
  {
    name: "Cycling & Fitness bikes",
    parent: "Sports & Fitness",
    img: "path_to_your_image_directory/cycling_fitness_bikes.jpg",
  },
  {
    name: "Indoor & outdoor sports equipment",
    parent: "Sports & Fitness",
    img: "path_to_your_image_directory/indoor_outdoor_sports_equipment.jpg",
  },
  {
    name: "Rackets & sports equipment",
    parent: "Sports & Fitness",
    img: "path_to_your_image_directory/rackets_sports_equipment.jpg",
  },
  {
    name: "Hunting & Fishing equipment",
    parent: "Outdoors & Travel",
    img: "path_to_your_image_directory/hunting_fishing_equipment.jpg",
  },
  {
    name: "Camping equipment",
    parent: "Outdoors & Travel",
    img: "path_to_your_image_directory/camping_equipment.jpg",
  },
  {
    name: "Boating & marine equipment",
    parent: "Outdoors & Travel",
    img: "path_to_your_image_directory/boating_marine_equipment.jpg",
  },
  {
    name: "Cycling & Outdoor equipment",
    parent: "Outdoors & Travel",
    img: "path_to_your_image_directory/cycling_outdoor_equipment.jpg",
  },
  {
    name: "Automotive equipment",
    parent: "Auto, Transport & Industrial",
    img: "path_to_your_image_directory/automotive_equipment.jpg",
  },
  {
    name: "Aviation equipment",
    parent: "Auto, Transport & Industrial",
    img: "path_to_your_image_directory/aviation_equipment.jpg",
  },
  {
    name: "Rail transport equipment",
    parent: "Auto, Transport & Industrial",
    img: "path_to_your_image_directory/rail_transport_equipment.jpg",
  },
  {
    name: "Shipping & marine transport equipment",
    parent: "Auto, Transport & Industrial",
    img: "path_to_your_image_directory/shipping_marine_transport_equipment.jpg",
  },
  {
    name: "Trucking & Transportation equipment",
    parent: "Auto, Transport & Industrial",
    img: "path_to_your_image_directory/trucking_transportation_equipment.jpg",
  },
  {
    name: "Machinery & Heavy Equipment",
    parent: "Auto, Transport & Industrial",
    img: "path_to_your_image_directory/machinery_heavy_equipment.jpg",
  },
  {
    name: "Wine & Beer making equipment",
    parent: "Kitchen & Cookware",
    img: "path_to_your_image_directory/wine_beer_making_equipment.jpg",
  },
  {
    name: "Coffee & Tea making equipment",
    parent: "Kitchen & Cookware",
    img: "path_to_your_image_directory/coffee_tea_making_equipment.jpg",
  },
  {
    name: "Food preparation equipment",
    parent: "Kitchen & Cookware",
    img: "path_to_your_image_directory/food_preparation_equipment.jpg",
  },
  {
    name: "Cookware & bakeware",
    parent: "Kitchen & Cookware",
    img: "path_to_your_image_directory/cookware_bakeware.jpg",
  },
  {
    name: "Dinnerware & tableware",
    parent: "Kitchen & Cookware",
    img: "path_to_your_image_directory/dinnerware_tableware.jpg",
  },
  {
    name: "Barware & Restaurant supplies",
    parent: "Kitchen & Cookware",
    img: "path_to_your_image_directory/barware_restaurant_supplies.jpg",
  },
  {
    name: "Medical & healthcare equipment",
    parent: "Health & Personal Care",
    img: "path_to_your_image_directory/medical_healthcare_equipment.jpg",
  },
  {
    name: "Pharmacy & drugstore supplies",
    parent: "Health & Personal Care",
    img: "path_to_your_image_directory/pharmacy_drugstore_supplies.jpg",
  },
  {
    name: "Beauty & personal care equipment",
    parent: "Health & Personal Care",
    img: "path_to_your_image_directory/beauty_personal_care_equipment.jpg",
  },
  {
    name: "Lab & scientific equipment",
    parent: "Health & Personal Care",
    img: "path_to_your_image_directory/lab_scientific_equipment.jpg",
  },
  {
    name: "Education & training equipment",
    parent: "Education & Training",
    img: "path_to_your_image_directory/education_training_equipment.jpg",
  },
  {
    name: "Learning & educational aids",
    parent: "Education & Training",
    img: "path_to_your_image_directory/learning_educational_aids.jpg",
  },
  {
    name: "Library & office equipment",
    parent: "Education & Training",
    img: "path_to_your_image_directory/library_office_equipment.jpg",
  },
  {
    name: "Audio & video equipment",
    parent: "Professional & Technical",
    img: "path_to_your_image_directory/audio_video_equipment.jpg",
  },
  {
    name: "Office equipment & supplies",
    parent: "Professional & Technical",
    img: "path_to_your_image_directory/office_equipment_supplies.jpg",
  },
  {
    name: "Industrial & maintenance equipment",
    parent: "Professional & Technical",
    img: "path_to_your_image_directory/industrial_maintenance_equipment.jpg",
  },
  {
    name: "Electronics & communication equipment",
    parent: "Professional & Technical",
    img: "path_to_your_image_directory/electronics_communication_equipment.jpg",
  },
];

export {categoryData};