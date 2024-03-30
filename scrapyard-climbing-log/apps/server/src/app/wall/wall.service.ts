import { Injectable } from '@nestjs/common';
import { CreateWallDto } from './dto/create-wall.dto';
import { UpdateWallDto } from './dto/update-wall.dto';
import db from '../database/db';
import { routes, walls } from '../database/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class WallService {
  create(name: string) {
    return db.insert(walls).values({
      name: name,
    });
  }

  findAllActiveRoutes(wallName: string) {
    // join with routes
    return db
      .select()
      .from(walls)
      .rightJoin(routes, eq(walls.name, routes.wallId))
      .where(and(eq(walls.name, wallName), eq(routes.archived, false)));
  }

  findOne(name: string) {
    return db
      .select({ name: walls.name })
      .from(walls)
      .where(eq(walls.name, name));
  }

  update(name: string, newName: string) {
    return db.update(walls).set({ name: newName }).where(eq(walls.name, name));
  }

  remove(name: string) {
    return db.delete(walls).where(eq(walls.name, name));
  }
}
