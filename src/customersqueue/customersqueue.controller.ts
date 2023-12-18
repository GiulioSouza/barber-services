import { Body, Controller, Delete, HttpStatus, NotFoundException, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CustomersqueueService } from './customersqueue.service';
import CreateCustomersQueueDto from './dto/create-customersqueue';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';

@Controller('customersqueue')
export class CustomersqueueController {
  constructor(private readonly customersQueueService: CustomersqueueService) {}

  @Post()
  async addCustomer(@Body() data: CreateCustomersQueueDto, @Res() res: Response){
    const queueExists = await this.customersQueueService.getTodaysExpertsQueue(data.expertId)

    if(!queueExists){
      throw new NotFoundException("The queue doesnt exists")
    }

    const customer = await this.customersQueueService.addCustomer({
      name: data.name,
      service: data.service,
      queueId: queueExists.id
    })

    return res.status(HttpStatus.CREATED).json(customer)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async serveCustomer(@Param('id') id: string, @Res()res: Response) {
    const customer = await this.customersQueueService.findCustomer(+id)

    if(!customer){
      throw new NotFoundException("The customer doesnt exists")
    }

    await this.customersQueueService.serveCustomer(customer.id)
    return res.status(HttpStatus.NO_CONTENT).send()
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param('id') id: string, @Res()res: Response) {
    const customer = await this.customersQueueService.findCustomer(+id)

    if(!customer){
      throw new NotFoundException("The customer doesnt exists")
    }

    await this.customersQueueService.deleteCustomer(customer.id)
    return res.status(HttpStatus.NO_CONTENT).send()
  }
}
