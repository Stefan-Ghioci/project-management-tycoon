import React from 'react';
import { useAppDispatch, useAppSelector } from '../engine';
import {
  selectAvailableDevs,
  selectCurrentWeek,
  selectHiredDevs,
  selectPlayerBalance,
} from '../engine/selectors';
import {
  Chip,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import { PersonAdd, Update } from '@mui/icons-material';
import { hireDev, passWeek } from '../engine/player';

const Game = () => {
  const dispatch = useAppDispatch();

  const balance = useAppSelector(selectPlayerBalance);
  const currentWeek = useAppSelector(selectCurrentWeek);
  const availableDevs = useAppSelector(selectAvailableDevs);
  const hiredDevs = useAppSelector(selectHiredDevs);

  return (
    <>
      <Typography>Week {currentWeek}</Typography>
      <Typography>Balance: ${balance}</Typography>
      {hiredDevs.map((developer) => (
        <Chip label={developer.name} />
      ))}
      <Divider />
      <List>
        {availableDevs.map((developer) => (
          <ListItem>
            <ListItemText
              primary={`$${developer.salary}`}
              secondary={developer.name}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => dispatch(hireDev(developer))}>
                <PersonAdd />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Fab
        color="primary"
        sx={({ spacing }) => ({
          position: 'absolute',
          bottom: spacing(4),
          right: spacing(4),
        })}
        onClick={() => dispatch(passWeek())}
      >
        <Update />
      </Fab>
    </>
  );
};

export default Game;
