import { FastifySchema } from "fastify";
import { outdent } from "outdent";
import { TopicParams, topicParamsSchema } from "$server/validators/topicParams";
import { SessionSchema } from "$server/models/session";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import { isUserOrAdmin } from "$server/utils/session";
import topicExists from "$server/utils/topic/topicExists";
import destroyTopic from "$server/utils/topic/destroyTopic";

export const destroySchema: FastifySchema = {
  summary: "トピックの削除",
  description: outdent`
    トピックを削除します。
    ブックから参照されている場合、そのブックから取り除きます。
    教員または管理者でなければなりません。
    教員の場合は自身の作成したトピックでなければなりません。`,
  params: topicParamsSchema,
  response: {
    204: { type: "null", description: "成功" },
    403: {},
    404: {},
  },
};

export const destroyHooks = {
  auth: [authUser, authInstructor],
};

export async function destroy({
  session,
  params,
}: {
  session: SessionSchema;
  params: TopicParams;
}) {
  const found = await topicExists(params.topic_id);

  if (!found) return { status: 404 };
  if (!isUserOrAdmin(session, { id: found.creatorId })) return { status: 403 };

  await destroyTopic(params.topic_id);

  return { status: 204 };
}
