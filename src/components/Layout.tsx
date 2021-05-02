import {
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import { SubjectOutlined, CreateOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { format } from "date-fns";

const DRAWER_WIDTH = 200;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: DRAWER_WIDTH,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
    toolbar: theme.mixins.toolbar,
    dateText: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(1),
    },
  };
});

const Layout: React.FC = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <CreateOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar color="secondary" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.dateText}>
            Today: {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography>Simon</Typography>
          <Avatar src="/profile.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            My Notes
          </Typography>
        </div>

        <List>
          {menuItems.map((item) => (
            <ListItem
              onClick={() => history.push(item.path)}
              button
              key={item.text}
              className={
                location.pathname === item.path ? classes.active : undefined
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
