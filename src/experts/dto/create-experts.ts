import { IsEmail, IsNotEmpty } from "class-validator"

export default class CreateExpertsDto{
    @IsNotEmpty({message: "Name's field is required "})
    name: string

    @IsNotEmpty({message: "Email's field is required "})
    @IsEmail({}, {message: "Invalid email format"})
    email: string
    
    phone: string
}