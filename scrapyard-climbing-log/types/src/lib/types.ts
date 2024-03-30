type Grade =
  | 'V?'
  | 'VB'
  | 'VB+'
  | 'V0'
  | 'V1'
  | 'V2'
  | 'V3'
  | 'V4'
  | 'V5'
  | 'V6'
  | 'V7'
  | 'V8'
  | 'V9'
  | '5.6'
  | '5.7'
  | '5.8'
  | '5.9'
  | '5.10-'
  | '5.10'
  | '5.10+'
  | '5.11-'
  | '5.11'
  | '5.11+'
  | '5.12-'
  | '5.12'
  | '5.12+'
  | '5.13-'
  | '5.13'
  | '5.13+'
  | '5.14-'
  | '5.14'
  | '5.14+'
  | '5.15-'
  | '5.15'
  | '5.15+';

export type Color =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'black'
  | 'white'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'seafoam';

export class Route {
  id: string;
  grade: Grade;
  dateSet: string;
  dateArchived?: string;
  archived: boolean;
  routeId: string;
  image: string;
  wallId: string;

  constructor(
    id: string,
    grade: Grade,
    dateSet: string,
    dateArchived: string,
    archived: boolean,
    routeId: string,
    image: string,
    wallId: string
  ) {
    this.id = id;
    this.grade = grade;
    this.dateSet = dateSet;
    this.dateArchived = dateArchived;
    this.archived = archived;
    this.routeId = routeId;
    this.image = image;
    this.wallId = wallId;
  }
}

export class Wall {
  name: string;

  constructor(name: string, routes: Route[], backgroundImg: string) {
    this.name = name;
  }
}

export class RouteInput {
  attempts: number;
  sent: boolean;
  notes?: string;
  routeId: string;

  constructor(attempts = 0, sent = false, notes: string, routeId: string) {
    this.attempts = attempts;
    this.sent = sent;
    this.notes = notes;
    this.routeId = routeId;
  }
}

export class User {
  userId: string;
  routes: RouteInput[];

  constructor(userId: string, routes: RouteInput[]) {
    this.userId = userId;
    this.routes = routes || [];
  }
}

export type WallRoute = {
  id: string;
  sent: boolean;
  grade: string;
  attempts: number;
};

export type RouteSearch = {
  grades: Grade[];
  dateSet: string;
  dateArchived: string;
  archived: boolean;
  color: Color;
  wall: string;
};
