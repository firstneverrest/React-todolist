import React from 'react';

// material ui component
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 0),
    margin: theme.spacing(2, 0),
  },
}));

const SubmitButton = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.root}
      fullWidth
    >
      เข้าสู่ระบบ
    </Button>
  );
};

export default SubmitButton;
