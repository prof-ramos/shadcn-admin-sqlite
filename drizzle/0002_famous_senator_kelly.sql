CREATE TABLE `study_progress` (
	`owner_id` text NOT NULL,
	`topic_id` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`owner_id`, `topic_id`)
);
