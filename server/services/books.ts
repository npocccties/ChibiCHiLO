import Method from "$server/types/method";
import { outdent } from "outdent";
import { bookSchema } from "$server/models/book";
import {
  PaginationProps,
  paginationPropsSchema,
} from "$server/validators/paginationProps";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import findBooks from "$server/utils/book/findBooks";

export type Query = PaginationProps;

export const method: Method = {
  get: {
    summary: "ブック一覧",
    description: outdent`
      ブックの一覧を取得します。
      教員または管理者でなければなりません。`,
    querystring: paginationPropsSchema,
    response: {
      200: {
        description: "成功時",
        type: "object",
        properties: {
          books: {
            type: "array",
            items: bookSchema,
          },
          page: paginationPropsSchema.properties?.page,
          perPage: paginationPropsSchema.properties?.per_page,
        },
      },
    },
  },
};

export const hooks = {
  get: { auth: [authUser, authInstructor] },
};

export async function index({ query }: { query: Query }) {
  const page = query.page ?? 0;
  const perPage = query.per_page ?? 50;
  const books = await findBooks(query.sort, page, perPage);

  return {
    status: 200,
    body: { books, page, perPage },
  };
}
