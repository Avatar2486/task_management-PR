const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

async function setupDatabase() {
    try {
        console.log('Connecting to PostgreSQL database...');

        // Read the schema file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Creating database schema...');
        await pool.query(schema);

        console.log('✓ Database schema created successfully!');

        // Insert a test user (for testing purposes)
        const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', ['test@example.com']);

        if (checkUser.rows.length === 0) {
            console.log('Creating test user...');
            // Note: In production, password should be hashed with bcrypt
            await pool.query(
                'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
                ['Test User', 'test@example.com', 'password123', 'user']
            );
            console.log('✓ Test user created (email: test@example.com, password: password123)');
        } else {
            console.log('Test user already exists');
        }

        console.log('\n✓ Database setup completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error setting up database:', error.message);
        process.exit(1);
    }
}

setupDatabase();
