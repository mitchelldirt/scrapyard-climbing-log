DO $$ BEGIN
 CREATE TYPE "color" AS ENUM('red', 'blue', 'green', 'yellow', 'black', 'white', 'purple', 'orange', 'pink', 'seafoam');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "route" ADD COLUMN "color" "color";