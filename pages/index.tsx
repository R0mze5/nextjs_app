import { NextPage } from "next";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { tvmazeSelectors } from "../client/redux/tvmaze";
import { ITvmazeShow } from "../typings/tvmaze";
import { IState } from "../typings/store";
import { MainLayout } from "../client/components";
import { routerActions } from "../client/redux/router";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

interface IStateProps {
  shows: Array<ITvmazeShow>;
}

const mapStateToProps: MapStateToProps<IStateProps, unknown, IState> = (
  state,
) => ({
  shows: tvmazeSelectors.getTvmazeShows(state),
});

interface IDispatchProps {
  goToPage: (path: string) => void;
}

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, unknown> = (
  dispatch,
) => ({
  goToPage: (path) => dispatch(routerActions.routerPushTriggerAction({ path })),
});

type Props = IStateProps & IDispatchProps;

const Home: NextPage<Props> = (props) => {
  const { shows, goToPage } = props;

  const classes = useStyles();
  return (
    <MainLayout>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            TVMaze Shows
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            It is an example of next js app with using tvmaze api
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {shows.map((show) => (
            <Grid item key={show.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={show.image?.medium}
                  title={show.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {show.name}
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => goToPage("shows/" + show.id.toString())}
                    size="small"
                    color="primary"
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
};

Home.whyDidYouRender = true;

// example of getInitialProps
// Home.getInitialProps = async (ctx: NextPageContext) => {
//   const { store } = ctx;
//   // 1.1 Here you can set response status
//   // if (res) {
//   //   res.statusCode = 401;
//   // }
//   const shows = store.getState().tvmaze.shows;
//   return { shows };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
