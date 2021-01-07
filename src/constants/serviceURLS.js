const environment = process.env.NODE_ENV;

export const serviceURL = environment === 'development' ? 'http://localhost:4000' : 'https://service.redwinegaming.com';