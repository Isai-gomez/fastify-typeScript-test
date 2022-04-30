import { Static, Type } from "@sinclair/typebox"
export interface IQuerystring {
    username: string
    password: string
}

export interface IHeaders {
    "h-Custom": string
}
export const User = Type.Object({
    name: Type.String(),
    mail: Type.Optional(Type.String({ format: "email" })),
})
export type UserType = Static<typeof User>
