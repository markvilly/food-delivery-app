import seed from "./seed";

// Execute the seed function to populate the database
seed()
  .then(() => console.log("Database seeded successfully"))
  .catch((error) => console.error("Error seeding database:", error));
