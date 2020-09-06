import React from "react";
import { MainLayout } from "../../client/components";
import { NextPageContext } from "next";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { IState, SagaStore } from "../../typings/store";
import { ITvmazeSeason, TTvmazeShowId } from "../../typings/tvmaze";
import { tvmazeSelectors, tvmazeActions } from "../../client/redux/tvmaze";
import { END } from "redux-saga";

interface IOwnProps extends NextPageContext {
  id: TTvmazeShowId | null;
}

interface IStateProps {
  seasons: Array<ITvmazeSeason>;
}

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IState> = (
  state,
  ownProps,
) => ({
  seasons: tvmazeSelectors.getTvmazeSeasonsByShowId(state, ownProps.id),
});

interface IDispatchProps {
  loadShowSeasons: () => void;
}

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch,
  ownProps,
) => ({
  loadShowSeasons: () =>
    dispatch(tvmazeActions.tvmazeSeasonsGetTriggerAction({ id: ownProps.id })),
});

const enhanced = connect(mapStateToProps, mapDispatchToProps);

type Props = IOwnProps & IStateProps & IDispatchProps;

class Seasons extends React.PureComponent<Props, never> {
  static async getInitialProps(ctx: NextPageContext) {
    const { query, store, res } = ctx;

    const seasonId = parseInt(query.id as string);

    if (isNaN(seasonId)) {
      // 1.1 Here you can set response status
      if (res) {
        res.statusCode = 404;
      }

      return { id: null };
    }

    store.dispatch(
      tvmazeActions.tvmazeSeasonsGetTriggerAction({ id: seasonId }),
    );
    store.dispatch(END);
    await (store as SagaStore).sagaTask.toPromise();

    return { id: seasonId };
  }

  componentDidMount() {
    const { loadShowSeasons, seasons, id } = this.props;

    if (!seasons && id) {
      loadShowSeasons();
    }
  }

  render() {
    return <MainLayout>Post {/* router.query?.id */}</MainLayout>;
  }
}

export default enhanced(Seasons);
