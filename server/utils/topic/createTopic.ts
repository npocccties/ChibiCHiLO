import { User } from "@prisma/client";
import { TopicProps, TopicSchema } from "$server/models/topic";
import prisma from "$server/utils/prisma";
import {
  topicsWithResourcesArg,
  topicToTopicSchema,
} from "./topicToTopicSchema";
import topicCreateInput from "./topicCreateInput";

async function createTopic(
  creatorId: User["id"],
  topic: TopicProps
): Promise<TopicSchema | undefined> {
  const created = await prisma.topic.create({
    data: topicCreateInput(creatorId, topic),
  });

  if (!created) return;

  const found = await prisma.topic.findUnique({
    ...topicsWithResourcesArg,
    where: { id: created.id },
  });

  if (!found) return;

  return topicToTopicSchema(found);
}

export default createTopic;
