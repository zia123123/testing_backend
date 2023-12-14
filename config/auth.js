module.exports = {
    secret: process.env.AUTH_SECRET ,
    rounds: process.env.AUTH_ROUNDS ,
    accessTokenExpiresIn: process.env.AUTH_EXPIRES ,
    refreshTokenExpiresIn: process.env.AUTH_EXPIRES_REFRESH
}