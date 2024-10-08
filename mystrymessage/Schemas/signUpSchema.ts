import {z} from 'zod'

export const userNameValidation = z.string().min(2, "Username must be atleast 2 characters").max(20, "Username must be less than 20 characters")

export const signUpSchema = z.object({
    username: userNameValidation,
    email: z.string().email({ message: "Invalid email address!"}),
    password: z.string().min(6,{ message: "Password must be atleast 6 characters" })
})