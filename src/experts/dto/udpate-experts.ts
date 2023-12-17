import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';
import CreateExpertsDto from './create-experts';

export default class UpdateExpertsDto extends PartialType(CreateExpertsDto) {
	@IsNotEmpty({ message: "Name's field is required " })
	name: string;

	@IsNotEmpty({ message: "Email's field is required " })
	@IsEmail({}, { message: 'Invalid email format' })
	email: string;

	phone: string;
}
