import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateExpertsDto from './dto/create-experts';
import UpdateExpertsDto from './dto/udpate-experts';

@Injectable()
export class ExpertsService {
    constructor(private readonly prismaService: PrismaService) {}

    async findExpertByEmail(email: string){
        return await this.prismaService.expert.findFirst({where: { email }})
    }

    async createExpert(data: CreateExpertsDto){
        return await this.prismaService.expert.create({ data })
    }

    async findAllExperts() {
        return await this.prismaService.expert.findMany()
    }

    async findExpert(id: string) {
        return await this.prismaService.expert.findFirst({where: { id }})
    }

    async updateExpert(id: string, data: UpdateExpertsDto) {
        await this.prismaService.expert.update({
            where: {id}, data
        })
    }
}
