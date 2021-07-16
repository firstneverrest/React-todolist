// material ui components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

// custom color
import colors from 'styles/colors';

// custom component
import SubmitButton from 'components/SubmitButton';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: '1px',
    margin: theme.spacing(3, 0),
    backgroundColor: colors.lightGrey,
  },
  textField: {
    margin: theme.spacing(2, 0),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Avatar></Avatar>
      <Typography component="h1" variant="h5" align="center">
        <Box mt={2} mb={1}>
          เข้าสู่ระบบ
        </Box>
      </Typography>
      <form>
        <TextField
          variant="outlined"
          required
          fullWidth
          className={classes.textField}
          id="username"
          label="ชื่อผู้ใช้"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          className={classes.textField}
          type="password"
          id="password"
          label="รหัสผ่าน"
          name="password"
          autoComplete="password"
        />
        <SubmitButton />
      </form>
      <Divider className={classes.divider} />
      <Link href="#" color="primary" variant="body1">
        สมัครสมาชิก
      </Link>
    </Container>
  );
};

export default LoginPage;
