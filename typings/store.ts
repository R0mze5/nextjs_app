import { ITvmaze } from "./tvmaze";
import { RouterState } from "connected-next-router/types";
import { Task } from "redux-saga";
import { Store } from "redux";

interface ITask extends Task {
  done?: void;
}

export interface SagaStore extends Store {
  sagaTask?: ITask;
  runSaga?: () => void;
  // stopSaga?: () => void;
  // execSagaTasks?: (
  //   isServer: boolean,
  //   tasks: (dispatch: Dispatch<AnyAction>) => { [key: string]: AnyAction },
  // ) => void;
}

export interface IState {
  router: RouterState;
  tvmaze: ITvmaze;
}
