import { createAction } from "redux-actions";
import { IRouterPushTriggerActionPayload } from "./types";

const routerPushTriggerAction = createAction<
  IRouterPushTriggerActionPayload,
  IRouterPushTriggerActionPayload
>("router->PUSH_TRIGGER", ({ path }) => ({ path }));

export const routerActions = { routerPushTriggerAction };
