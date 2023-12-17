import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Res
} from '@nestjs/common';
import { ExpertsService } from './experts.service';
import CreateExpertsDto from './dto/create-experts';
import { Response } from 'express';
import { stringify } from 'querystring';
import UpdateExpertsDto from './dto/udpate-experts';

@Controller('experts')
export class ExpertsController {
	constructor(private readonly expertsService: ExpertsService) {}

	@Post()
	async create(@Body() data: CreateExpertsDto, @Res() res: Response) {
		const expertExists = await this.expertsService.findExpertByEmail(
			data.email
		);

		if (expertExists) {
			throw new BadRequestException(
				'This email is already assigned to an expert'
			);
		}

		const expert = await this.expertsService.createExpert(data);
		return res.status(HttpStatus.CREATED).json(expert);
	}

	@Get()
	async getExperts(@Res() res: Response) {
		const experts = await this.expertsService.findAllExperts();
		return res.json(experts);
	}

	@Get(':id')
	async getExpert(@Param('id') id: string, @Res() res: Response) {
		const expert = await this.expertsService.findExpert(id);

		if (!expert) {
			throw new NotFoundException('The professional could not be found');
		}

		return res.json(expert);
	}

	@Patch(':id')
	async updateExpert(
		@Param('id') id: string,
		@Body() data: UpdateExpertsDto,
		@Res() res: Response
	) {
		const expert = await this.expertsService.findExpert(id);

		if (!expert) {
			throw new NotFoundException('The professional could not be found');
		}

		if (data.email) {
			const emailExists = await this.expertsService.findExpertByEmail(
				data.email
			);

			if (emailExists && emailExists.email !== expert.email) {
				throw new BadRequestException(
					'This email is already assigned to an expert'
				);
			}
		}

		await this.expertsService.updateExpert(id, { ...expert, ...data });
		return res.status(HttpStatus.NO_CONTENT).send();
	}
}
