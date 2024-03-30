import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WallService } from './wall.service';
import { Wall } from '@scrapyard-climbing-log/types';

@Controller('wall')
export class WallController {
  constructor(private readonly wallService: WallService) {}

  @Post()
  create(@Body() wall: Wall) {
    return this.wallService.create(wall.name);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.wallService.findAllActiveRoutes(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() newName: { name: string }) {
    return this.wallService.update(name, newName.name);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.wallService.remove(name);
  }
}
