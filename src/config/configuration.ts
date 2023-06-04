export default () => ({
  SERVER_PORT: parseInt(process.env.SERVER_PORT || '3000', 10),
  SERVER_HOST: process.env.SERVER_HOST || 'localhost',
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:3000',
});
