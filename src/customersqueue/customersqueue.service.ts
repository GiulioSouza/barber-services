import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';


type CreateCustomer = {
    name: string
    service: string
    queueId: string
}

@Injectable()
export class CustomersqueueService {
    constructor(private readonly prismaService: PrismaService) {}

    async addCustomer(data: CreateCustomer) {
        return await this.prismaService.customerQueue.create({
            data
        })
    }

    async getTodaysExpertsQueue(expertId) {
        return await this.prismaService.queue.findFirst({
            where: {
                expertId,
                createdAt: {
                    equals: new Date()
                }
            }
        })
    }

    async serveCustomer(customerId: number){
        await this.prismaService.customerQueue.update({ where: { id: customerId }, data: {
            isAwaiting: false
          }})
      }
     
    async findCustomer(customerId: number) {
        return await this.prismaService.customerQueue.findFirst({ where: {id: customerId}})
    }

    async deleteCustomer(customerId: number) {
        return await this.prismaService.customerQueue.delete({ where: {id: customerId}})
    }
}
