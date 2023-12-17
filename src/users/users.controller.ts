import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import CreateUsersDto from './dto/create-users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUsersDto, @Res() res: Response) {
    const userEmail = await this.usersService.findUserByEmail(data.email)

    if(userEmail){
      throw new BadRequestException('Email already exists')
    }

    const user = await this.usersService.createUser(data)
    return res.status(HttpStatus.CREATED).json(user)
  }
}
