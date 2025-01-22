import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().min(9, { message: "Enter a valid mail address." }).max(50),
    password: z.string().min(8, { message: "Enter a valid password of minimum 8 characters." })
})