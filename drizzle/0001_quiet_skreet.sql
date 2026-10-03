DROP INDEX `idx_members_owner_email`;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_members_owner_email` ON `members` (`owner_id`,`email`) WHERE "members"."deleted_at" IS NULL;