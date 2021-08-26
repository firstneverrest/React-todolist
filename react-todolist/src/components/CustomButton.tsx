import React from 'react';

import { ButtonProps } from 'type.model';

// material ui component
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 6),
    margin: theme.spacing(2, 0),
  },
}));

const CustomButton: React.FC<ButtonProps> = ({ message, onClick }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.root}
      onClick={onClick}
    >
      {message}
    </Button>
  );
};

export default CustomButton;
