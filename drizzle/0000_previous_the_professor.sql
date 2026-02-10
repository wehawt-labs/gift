CREATE TYPE "public"."order_status" AS ENUM('pending_payment', 'paid', 'in_progress', 'review', 'revision_requested', 'completed');--> statement-breakpoint
CREATE TYPE "public"."order_tier" AS ENUM('standard', 'premium');--> statement-breakpoint
CREATE TABLE "order_message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderId" uuid NOT NULL,
	"senderId" text NOT NULL,
	"content" text NOT NULL,
	"isRead" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"lemonSqueezyOrderId" varchar(255),
	"tier" "order_tier" NOT NULL,
	"status" "order_status" DEFAULT 'pending_payment' NOT NULL,
	"recipientName" varchar(255) NOT NULL,
	"recipientRelationship" varchar(255) NOT NULL,
	"occasion" varchar(255) NOT NULL,
	"storyPrompt" text NOT NULL,
	"genre" varchar(255) NOT NULL,
	"vibe" varchar(255) NOT NULL,
	"amountPaid" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "order_lemonSqueezyOrderId_unique" UNIQUE("lemonSqueezyOrderId")
);
--> statement-breakpoint
CREATE TABLE "song" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderId" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"audioUrl" text NOT NULL,
	"coverArtUrl" text,
	"lyrics" text,
	"version" integer DEFAULT 1 NOT NULL,
	"isSelected" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "order_message" ADD CONSTRAINT "order_message_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_message" ADD CONSTRAINT "order_message_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "song" ADD CONSTRAINT "song_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;