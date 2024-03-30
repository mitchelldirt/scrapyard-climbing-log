DO $$ BEGIN
 CREATE TYPE "grade" AS ENUM('V?', 'VB', 'VB+', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', '5.6', '5.7', '5.8', '5.9', '5.10-', '5.10', '5.10+', '5.11-', '5.11', '5.11+', '5.12-', '5.12', '5.12+', '5.13-', '5.13', '5.13+', '5.14-', '5.14', '5.14+', '5.15-', '5.15', '5.15+');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "route_note" (
	"id" serial PRIMARY KEY NOT NULL,
	"notes" text DEFAULT '',
	"sent" boolean DEFAULT false,
	"attempts" integer DEFAULT 0,
	"userId" varchar NOT NULL,
	"routeId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "route" (
	"id" serial PRIMARY KEY NOT NULL,
	"grade" "grade" NOT NULL,
	"dateSet" date NOT NULL,
	"dateArchived" date,
	"archived" boolean DEFAULT false,
	"image" varchar(300),
	"wallId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"userId" varchar(100) PRIMARY KEY NOT NULL,
	"role" "role" DEFAULT 'user'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wall" (
	"name" varchar(20) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "route_note" ADD CONSTRAINT "route_note_userId_user_userId_fk" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "route_note" ADD CONSTRAINT "route_note_routeId_route_id_fk" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "route" ADD CONSTRAINT "route_wallId_wall_name_fk" FOREIGN KEY ("wallId") REFERENCES "wall"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
