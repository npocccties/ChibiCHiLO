import { User } from "@prisma/client";
import { SessionSchema } from "$server/models/session";
import { LtiLaunchBody } from "$server/validators/ltiLaunchBody";
import * as ltiRoles from "./ltiv1p1/roles";

/**
 * セッションが管理者のものであるか否か
 * @param session セッション
 * @return セッションが管理者のものの場合 true、それ以外の場合 false
 */
export function isAdministrator(session: SessionSchema) {
  return hasRole(session, ltiRoles.isAdministrator);
}

/**
 * セッションが教員・管理者のものであるか否か
 * @param session セッション
 * @return セッションが教員または管理者のものの場合 true、それ以外の場合 false
 */
export function isInstructor(session: SessionSchema) {
  return hasRole(session, ltiRoles.isInstructor);
}

/**
 * セッションが管理者か特定の利用者のものであるか
 * @param session セッション
 * @param user 対象の利用者
 * @return セッションが利用者自身または管理者のものの場合 true、それ以外の場合 false
 */
export function isUserOrAdmin(session: SessionSchema, user: Pick<User, "id">) {
  return verify(session, user) || isAdministrator(session);
}

/**
 * 特定のロールであるか否か
 * @param session セッション
 * @param roleToFind 対象のロール
 * @return 対象のロールを持っている場合 true、それ以外の場合 false
 */
function hasRole(
  session: SessionSchema,
  roleToFind: (ltiLaunchBody: LtiLaunchBody) => boolean
) {
  return roleToFind(session.ltiLaunchBody);
}

/**
 * セッションが利用者のものであるか否か
 * @param session セッション
 * @param user 対象の利用者
 * @return セッションが利用者のものの場合 true、それ以外の場合 false
 */
function verify(session: SessionSchema, user: Pick<User, "id">) {
  return session.user.id === user.id;
}
