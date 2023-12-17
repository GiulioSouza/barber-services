import { IsNotEmpty } from "class-validator";

export default class CreateQueueDto {
    @IsNotEmpty({message: "expertId's field is required"})
    expertId: string
}