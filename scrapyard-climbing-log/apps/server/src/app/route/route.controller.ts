import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RouteService } from './route.service';
import db from '../database/db';
import { Route, RouteSearch } from '@scrapyard-climbing-log/types';
import { InsertRouteDTO } from '../database/schema';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  create(@Body() route: InsertRouteDTO) {
    return this.routeService.create(route);
  }

  @Get('search')
  findAll(@Body() query: RouteSearch) {
    return this.routeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: InsertRouteDTO) {
    return this.routeService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeService.remove(+id);
  }
}
