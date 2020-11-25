# Migration `20201120013830`

This migration has been generated by Kohei Watanabe at 11/20/2020, 10:38:30 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."resources" (
"id" SERIAL,
"video_id" integer   ,
"url" text   NOT NULL ,
"details" jsonb   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."videos" (
"id" SERIAL,
"provider_url" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."tracks" (
"id" SERIAL,
"video_id" integer   NOT NULL ,
"kind" text   NOT NULL DEFAULT E'subtitles',
"language" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."topics" (
"id" SERIAL,
"resource_id" integer   NOT NULL ,
"name" text   NOT NULL ,
"description" text   NOT NULL ,
"time_required" integer   NOT NULL ,
"creator_id" integer   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"details" jsonb   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."keywords" (
"id" SERIAL,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."lti_context" (
"id" text   NOT NULL ,
"title" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."lti_resource_link" (
"id" text   NOT NULL ,
"context_id" text   NOT NULL ,
"title" text   NOT NULL ,
"book_id" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."books" (
"id" SERIAL,
"name" text   NOT NULL ,
"abstruct" text   NOT NULL ,
"author_id" integer   NOT NULL ,
"published_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"details" jsonb   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."sections" (
"id" SERIAL,
"book_id" integer   NOT NULL ,
"order" integer   NOT NULL ,
"name" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."topic_sections" (
"id" SERIAL,
"section_id" integer   NOT NULL ,
"topic_id" integer   NOT NULL ,
"order" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."users" (
"id" SERIAL,
"lti_user_id" text   NOT NULL ,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."activities" (
"id" SERIAL,
"topic_id" integer   NOT NULL ,
"learner_id" integer   NOT NULL ,
"type" text   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."sessions" (
"id" text   NOT NULL ,
"sid" text   NOT NULL ,
"data" text   NOT NULL ,
"expires" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."accounts" (
"id" SERIAL,
"nonce" text   NOT NULL ,
"timestamp" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."_KeywordToTopic" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

CREATE TABLE "public"."_BookToKeyword" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

CREATE UNIQUE INDEX "resources.url_unique" ON "public"."resources"("url")

CREATE UNIQUE INDEX "resources_video_id_unique" ON "public"."resources"("video_id")

CREATE UNIQUE INDEX "keywords.name_unique" ON "public"."keywords"("name")

CREATE INDEX "author_id" ON "public"."books"("author_id")

CREATE INDEX "book_id" ON "public"."sections"("book_id")

CREATE INDEX "section_id" ON "public"."topic_sections"("section_id")

CREATE INDEX "topic_id" ON "public"."activities"("topic_id")

CREATE INDEX "learner_id" ON "public"."activities"("learner_id")

CREATE UNIQUE INDEX "sessions.sid_unique" ON "public"."sessions"("sid")

CREATE UNIQUE INDEX "accounts.nonce_timestamp_unique" ON "public"."accounts"("nonce", "timestamp")

CREATE UNIQUE INDEX "_KeywordToTopic_AB_unique" ON "public"."_KeywordToTopic"("A", "B")

CREATE INDEX "_KeywordToTopic_B_index" ON "public"."_KeywordToTopic"("B")

CREATE UNIQUE INDEX "_BookToKeyword_AB_unique" ON "public"."_BookToKeyword"("A", "B")

CREATE INDEX "_BookToKeyword_B_index" ON "public"."_BookToKeyword"("B")

ALTER TABLE "public"."resources" ADD FOREIGN KEY("video_id")REFERENCES "public"."videos"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."tracks" ADD FOREIGN KEY("video_id")REFERENCES "public"."videos"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."topics" ADD FOREIGN KEY("resource_id")REFERENCES "public"."resources"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."topics" ADD FOREIGN KEY("creator_id")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."lti_resource_link" ADD FOREIGN KEY("context_id")REFERENCES "public"."lti_context"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."lti_resource_link" ADD FOREIGN KEY("book_id")REFERENCES "public"."books"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."books" ADD FOREIGN KEY("author_id")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."sections" ADD FOREIGN KEY("book_id")REFERENCES "public"."books"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."topic_sections" ADD FOREIGN KEY("section_id")REFERENCES "public"."sections"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."topic_sections" ADD FOREIGN KEY("topic_id")REFERENCES "public"."topics"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."activities" ADD FOREIGN KEY("topic_id")REFERENCES "public"."topics"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."activities" ADD FOREIGN KEY("learner_id")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_KeywordToTopic" ADD FOREIGN KEY("A")REFERENCES "public"."keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_KeywordToTopic" ADD FOREIGN KEY("B")REFERENCES "public"."topics"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_BookToKeyword" ADD FOREIGN KEY("A")REFERENCES "public"."books"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_BookToKeyword" ADD FOREIGN KEY("B")REFERENCES "public"."keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201028064402..20201120013830
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -197,4 +197,26 @@
   @@index([topicId], name: "topic_id")
   @@index([learnerId], name: "learner_id")
   @@map(name: "activities")
 }
+
+// Etc.
+
+/// セッションストア
+model Session {
+  id      String   @id
+  sid     String   @unique @default(cuid())
+  data    String
+  expires DateTime
+
+  @@map(name: "sessions")
+}
+
+/// OAuth Account
+model Account {
+  id        Int    @id @default(autoincrement())
+  nonce     String
+  timestamp Int
+
+  @@unique([nonce, timestamp])
+  @@map(name: "accounts")
+}
```

