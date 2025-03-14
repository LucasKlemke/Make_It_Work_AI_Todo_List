ALTER TABLE "tasks" ADD COLUMN "must_be_done_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "is_done";