import { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";

const ltiResourceLinks: readonly Omit<
  LtiResourceLinkSchema,
  "consumerId" | "bookId"
>[] = [
  {
    id: "1",
    contextId: "2",
    title: "リンク",
    contextTitle: "コース",
  },
];

export default ltiResourceLinks;
