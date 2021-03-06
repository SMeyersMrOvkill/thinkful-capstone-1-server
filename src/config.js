module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://muffin:password@localhost/library',
    JWT_SECRET: process.env.JWT_SECRET || 'library-client-auth-token',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}