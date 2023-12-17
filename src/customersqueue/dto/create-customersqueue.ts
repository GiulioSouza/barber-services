import { IsNotEmpty } from "class-validator"

export default class CreateCustomersQueueDto{
    @IsNotEmpty({message: "name's field is required"})
    name: string
    
    @IsNotEmpty({message: "service's field is required"})
    service: string

    @IsNotEmpty({message: "expertId's field is required"})
    expertId: string
}