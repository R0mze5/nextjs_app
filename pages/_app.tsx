import App, { AppInitialProps, AppContext } from "next/app";
import { ConnectedRouter } from "connected-next-router";

import { register, unregister } from "next-offline/runtime";

import NextNprogress from "nextjs-progressbar";

import "../styles/globals.css";

import { wrapper } from "../client/redux/store";
import { tvmazeActions } from "../client/redux/tvmaze";
import { END } from "redux-saga";
import { SagaStore } from "../typings/store";

export class MyApp extends App<AppInitialProps> {
  public static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<AppInitialProps> {
    const { store, req } = ctx;

    // 0. Here you can restore session with cookie with redux saga to get values in ".getInitialProps" of Component
    if (req && store && !store.getState().tvmaze?.shows?.length) {
      // 0.1 Here you can autorize with cookie or run and await some actions in redux saga
      store.dispatch(tvmazeActions.tvmazeShowsGetTriggerAction());
      store.dispatch(END);
      await (store as SagaStore).sagaTask.toPromise();
      // 0.2 Here you can check redux saga result
      // console.log(store.getState().tvmaze);
    }

    // 1. Wait for all page actions to dispatch
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };

    // 1.1 Here you can set response status
    // if (res) {
    //   res.statusCode = 401;
    // }

    // 2. Stop the saga if on server
    if (req && store) {
      store.dispatch(tvmazeActions.tvmazeShowsGetTriggerAction());
      store.dispatch(END);
    }

    // 3. Return props
    return {
      pageProps,
    };
  }

  componentDidMount() {
    register();
  }

  componentWillUnmount() {
    unregister();
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ConnectedRouter>
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />
        <Component {...pageProps} />
      </ConnectedRouter>
    );
  }
}

export default wrapper.withRedux(MyApp);
