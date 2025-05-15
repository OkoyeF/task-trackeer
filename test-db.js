const { pool, initializeDatabase } = require('./config/db');

async function testDatabaseConnection() {
  try {
    console.log('Attempting to initialize database...');
    await initializeDatabase();
    
    console.log('Testing query execution...');
    const result = await pool.query('SELECT NOW()');
    console.log('Database query successful!');
    console.log('Current database time:', result.rows[0].now);
    
    console.log('Database connection and initialization successful!');
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await pool.end();
  }
}

testDatabaseConnection();