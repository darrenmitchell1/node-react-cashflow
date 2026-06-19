import { DataSource } from 'typeorm';

// Define database connection credentials
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nestuser',
  password: process.env.DB_PASSWORD || 'nestpassword',
  database: process.env.DB_DATABASE || 'nestdb',
  synchronize: false, // Always false for manual connection testing
  logging: true,
});


async function testConnection() {
  console.log('🔄 Attempting to connect to PostgreSQL via TypeORM...');
  
  try {
    // Establish database connection
    await AppDataSource.initialize();
    console.log('✅ Connection successfully established!');

    // Execute a quick raw SQL query to verify data integrity
    const result = await AppDataSource.query('SELECT NOW() as current_time');
    console.log('🕒 Database server time:', result[0].current_time);

  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error(error);
  } finally {
    // Terminate connection pool safely
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('🔌 Connection closed.');
    }
  }
}

testConnection();