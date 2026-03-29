import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  Typography,
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';

import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { getAllNotification } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [notifications, setNotifications] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { canViewAllNotification } = useCan();

  React.useEffect(() => {
    const datanotification = async () => {
      try {
        const value = 'true';
        const data = await dispatch(getAllNotification(value, navigate));
        setNotifications(data);
      } catch (error) {
        console.log(error, 'fetching notification');
      }
    };
    datanotification();
  }, [dispatch, navigate]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handlenotification = () => {
    navigate('/notification');
    setOpen(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const calculateTimeDifference = (timestamp) => {
    const now = new Date();
    const updatedAt = new Date(timestamp);
    const differenceInMinutes = Math.floor((now - updatedAt) / (1000 * 60));

    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} min`;
    } else if (differenceInMinutes < 1440) {
      const hours = Math.floor(differenceInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(differenceInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''}`;
    }
  };

  return (
    <>
      {canViewAllNotification() === true && (
        <Button
          sx={{
            minWidth: { sm: 50, xs: 35 }
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          aria-label="Notification"
          onClick={handleToggle}
          color="inherit"
        >
          <NotificationsNoneTwoToneIcon sx={{ fontSize: '1.5rem' }} />
        </Button>
      )}
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 350,
                    minWidth: 250,
                    backgroundColor: theme.palette.background.paper,
                    pb: 0,
                    borderRadius: '10px'
                  }}
                >
                  {notifications.map((notification) => (
                    <>
                      <ListItem key={notification.id} alignItems="flex-start" sx={{ paddingTop: '0px' }}>
                        <Grid container alignItems="flex-start">
                          <Grid item sm={10} justifyContent="flex-start">
                            <ListItemText
                              primary={
                                <Typography variant="body2" color="textSecondary">
                                  {notification.notification}
                                </Typography>
                              }
                            />
                          </Grid>
                          <Grid item sm={2} container justifyContent="flex-end">
                            <ListItemSecondaryAction>
                              <Grid alignItems="end">
                                <Typography
                                  // alignItems="end"
                                  variant="caption"
                                  color="textSecondary"
                                  sx={{ color: theme.palette.grey[400] }}
                                >
                                  {calculateTimeDifference(notification.updatedAt)}
                                </Typography>
                              </Grid>
                            </ListItemSecondaryAction>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider orientation="horizontal" flexItem />
                    </>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button style={{ padding: '6px 10px' }} color="secondary" onClick={handlenotification}>
                      View All
                    </Button>
                  </div>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
