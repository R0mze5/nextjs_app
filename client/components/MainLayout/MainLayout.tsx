import Head from "next/head";

import React, { useCallback } from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { routerActions } from "../../redux/router";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
}));

interface IProps {
  title?: string;
}

export const MainLayout: NextPage<IProps> = ({ children, title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const goToPage = useCallback(
    (path) => dispatch(routerActions.routerPushTriggerAction({ path })),
    [dispatch],
  );

  return (
    <>
      <Head>
        <title>{title || "Next.js App"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
            onClick={() => goToPage("/")}
          >
            Home
          </Typography>

          <Button
            onClick={() => goToPage("/private")}
            variant="outlined"
            size="small"
          >
            Private Route
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
