import { Injectable } from '@nestjs/common';
import db from '../database/db';
import { InsertRouteDTO, routes } from '../database/schema';
import { RouteSearch } from '@scrapyard-climbing-log/types';
import { eq, sql, inArray, and, gt, lt, gte, asc } from 'drizzle-orm';

@Injectable()
export class RouteService {
  create(route: InsertRouteDTO) {
    return db.insert(routes).values({
      grade: route.grade,
      image: route.image,
      wallId: route.wallId,
      dateSet: route.dateSet,
      color: route.color,
    });
  }

  findAll(search: RouteSearch) {
    if (search.archived && search.dateArchived) {
      return db
        .select()
        .from(routes)
        .where(
          and(
            inArray(routes.grade, search.grades),
            eq(routes.color, search.color),
            gt(routes.dateSet, search.dateSet),
            lt(routes.dateArchived, search.dateArchived),
            eq(routes.archived, search.archived),
            eq(routes.wallId, search.wall)
          )
        );
    } else if (search.archived === false) {
      return db
        .select()
        .from(routes)
        .where(
          and(
            inArray(routes.grade, search.grades),
            eq(routes.color, search.color),
            gte(routes.dateSet, search.dateSet),
            eq(routes.archived, search.archived),
            eq(routes.wallId, search.wall)
          )
        )
        .orderBy(asc(routes.dateSet));
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: InsertRouteDTO) {
    return db.update(routes).set(updateRouteDto).where(eq(routes.id, id));
  }

  remove(id: number) {
    return db.delete(routes).where(eq(routes.id, id));
  }
}
