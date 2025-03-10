import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username requerido'
    }),
    email: z.string({
        required_error: 'Email requerido'
    }).email({
        message: 'email invalido'
    }),
    password: z.string({
        required_error: 'Contraseña es requerida'
    }).min(8,{
        message: 'La contraseña debe tener 8 caracteres'
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email requerido'
    }).email({
        message: 'email invalido'
    }),
    password: z.string({
        required_error: 'Contraseña es requerida'
    }).min(8,{
        message: 'La contraseña debe tener 8 caracteres'
    })

})