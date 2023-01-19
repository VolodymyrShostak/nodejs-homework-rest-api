const app = require('./src/app');
const { connectMongoDB } = require('./src/db/connection');


const start = async () => {
  try {
    await connectMongoDB();
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log( "Database connection failed");
    process.exit(1);
  }
};

start();
