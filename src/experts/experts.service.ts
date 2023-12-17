import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateExpertsDto from './dto/create-experts';

@Injectable()
export class ExpertsService {
    constructor(private readonly prismaService: PrismaService) {}

    async findExpertByEmail(email: string){
        return await this.prismaService.expert.findFirst({where: {email}})
    }

    async createExpert(data: CreateExpertsDto){
        return await this.prismaService.expert.create({ data })
    }

    async findAllExperts() {
        return await this.prismaService.expert.findMany()
    }
}
