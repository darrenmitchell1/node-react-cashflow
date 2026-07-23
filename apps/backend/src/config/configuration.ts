export default () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'default_user',
    password: process.env.DB_PASSWORD ?? 'default_pwd',
    database: process.env.DB_DATABASE ?? 'default_db',
  },
});
