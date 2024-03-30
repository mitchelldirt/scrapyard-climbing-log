import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WallModule } from './wall/wall.module';
import { RouteModule } from './route/route.module';

@Module({
  imports: [WallModule, RouteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
