import type { FastifyRequest } from "fastify";
import { LtiLaunchBody } from "$server/validators/ltiLaunchBody";
import { auth, valid } from "$server/utils/ltiv1p1/oauth";
import prisma from "$server/utils/prisma";

async function authLtiLaunch(req: FastifyRequest) {
  const body = req.body as LtiLaunchBody;

  if (!valid((body as unknown) as Record<string, unknown>)) {
    throw new Error("invalid");
  }

  const url = `${req.protocol}://${req.hostname}${req.url}`;
  const secret = await lookupSecret(body.oauth_consumer_key);
  const authorized =
    secret &&
    (await auth(
      url,
      (body as unknown) as Record<string, string>,
      body.oauth_consumer_key,
      secret,
      lookupNonce
    ));

  if (!authorized) throw new Error("unauthorized");

  req.session.ltiLaunchBody = body;
}

export default authLtiLaunch;

async function lookupSecret(oauthConsumerKey: string) {
  const found = await prisma.ltiConsumer.findUnique({
    where: { id: oauthConsumerKey },
    select: { secret: true },
  });

  return found?.secret;
}

async function lookupNonce(nonce: string, timestamp: number) {
  const count = await prisma.account.count({
    where: { nonce, timestamp },
  });

  if (count === 0) {
    await prisma.account.create({
      data: {
        nonce,
        timestamp,
      },
    });
  }

  return count > 0;
}
