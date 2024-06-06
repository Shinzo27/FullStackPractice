const zod = require('zod')

const UserSignUpParser = zod.object({
    Username: zod.string(),
    FirstName: zod.string(),
    LastName: zod.string(),
    Password: zod.string(),
})

const UserSignInParser = zod.object({
    Username: zod.string(),
    Password: zod.string(),
})

const UserUpdateParser = zod.object({
    FirstName: zod.string(),
    LastName: zod.string(),
    Password: zod.string(),
})

module.exports = {
    UserSignUpParser,
    UserSignInParser,
    UserUpdateParser
}