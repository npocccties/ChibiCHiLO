import { ResourceParams } from "$server/validators/resourceParams";
import { VideoTrackParams } from "$server/validators/videoTrackParams";
import { showSchema, showHooks, show } from "./show";
import { createSchema, createHooks, create } from "./create";
import { destroySchema, destroyHooks, destroy } from "./destroy";

export type Params = VideoTrackParams;
export type CreateParams = ResourceParams;
export type { CreateBody } from "./create";

export const method = {
  get: showSchema,
  post: createSchema,
  delete: destroySchema,
};

export const hooks = {
  get: showHooks,
  post: createHooks,
  delete: destroyHooks,
};

export { show, create, destroy };
