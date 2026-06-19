export default () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  database: {
    host: process.env.DB_POSTGRES_HOST ?? 'localhost',
    port: parseInt(process.env.DB_POSTGRES_PORT ?? '5432', 10),
    username: process.env.DB_POSTGRES_USER ?? 'default_user',
    password: process.env.DB_POSTGRES_PASSWORD ?? 'default_pwd',
    name: process.env.DB_POSTGRES_NAME ?? 'default_db',
  },
});
