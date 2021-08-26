import React from 'react';

// change path
import { useHistory } from 'react-router-dom';

// material ui components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CustomButton from 'components/CustomButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const NotFound: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const goToLoginPage = () => {
    history.push('/login');
  };
  return (
    <Container maxWidth="xs" className={classes.root}>
      <Typography component="h2" variant="h4" align="center">
        <Box mb={4}>ไม่พบข้อมูลที่เกี่ยวข้อง</Box>
      </Typography>
      <CustomButton message={'กลับสู่หน้า login'} onClick={goToLoginPage} />
    </Container>
  );
};

export default NotFound;
