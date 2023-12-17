import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { QueuesService } from './queues.service';
import CreateQueueDto from './dto/create-queue';
import { ExpertsService } from 'src/experts/experts.service';

@Controller('queues')
export class QueuesController {
	constructor(private readonly queuesService: QueuesService, private readonly expertsService: ExpertsService) {}

	@Post()
	async createQueue(@Body() data: CreateQueueDto, @Res() res: Response){
		const expert = await this.expertsService.findExpert(data.expertId)

		if(!expert){
			throw new NotFoundException('The expert doesnt exists')
		}

		const queueExists = await this.queuesService.expertsQueueExists(data.expertId)

		if(queueExists){
			throw new BadRequestException("There is already an expert's queue for today")
		}

		const queue = await this.queuesService.createQueue(data)
		return res.status(HttpStatus.CREATED).json(queue)
	}

	@Get()
	async getExpertsQueues(@Query('expertId') expertId: string, @Res() res: Response) {
		if(expertId){
			const expert = await this.expertsService.findExpert(expertId)

			if(!expert){
				throw new NotFoundException('The expert doesnt exists')
			}

			const queues = await this.queuesService.getExpertsQueues(expertId)
			return res.json(queues)
		}

		const queues = await this.queuesService.getQueues()
		return res.json(queues)
	}

	@Get('today')
	async getTodaysQueues(@Res() res: Response) {
		const queues = await this.queuesService.getTodaysQueues()
		return res.json(queues)
	}
}
