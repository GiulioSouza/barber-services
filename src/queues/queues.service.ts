import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateQueueDto from './dto/create-queue';

@Injectable()
export class QueuesService {
    constructor (private readonly prismaService: PrismaService){}

    async createQueue(data: CreateQueueDto) {
        return await this.prismaService.queue.create({ data })
    }

    async expertsQueueExists(expertId: string){
        return await this.prismaService.queue.findFirst({
            where: {
                createdAt: {
                    equals: new Date()
                },
                expertId
            }
        })
    }

    async getQueues(){
        return await this.prismaService.queue.findMany()
    }

    async getExpertsQueues(expertId: string){
        return await this.prismaService.queue.findMany({ where: {expertId }, include: { expert: true }})
    }

    async getTodaysQueues() {
        const todaysQueue = await this.prismaService.queue.findMany({
            where: {
                createdAt: {
                    equals: new Date()
                }
            },
            include: {
                expert: true,
                CustomerQueue: true
            }
        })

        return todaysQueue.map(item => {
            return {
                ...item,
                CustomerQueue: item.CustomerQueue.filter(customer => customer.isAwaiting)
            }
        })
    }
}
