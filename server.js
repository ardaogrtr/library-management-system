const app = require('./app');  // Import the app from app.js
const sequelize = require('./config/database');

// Check database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection successful.");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);  // Exit application if connection fails
    }

    try {
        await sequelize.sync({ alter: true });  // Apply schema changes automatically
        console.log("Database synchronized.");
    } catch (err) {
        console.error("Database synchronization error:", err);
    }
})();

// Start the server
const PORT = process.env.PORT || 3000;  // Get the port from .env file
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
