import { Lusitana, Montserrat, Inter } from 'next/font/google'

export const monserrat = Montserrat({subsets:['latin']})

export const lusitana = Lusitana({
    weight:['400','700'],
    subsets:['latin']
})

export const inter = Inter({
    weight:['400', '700', '900'],
    subsets:['latin']
})