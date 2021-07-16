import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
  padding: {
    padding: theme.spacing(3, 0),
  },
  margin: {
    margin: theme.spacing(2, 0),
  },
  paper: {
    marginTop: theme.spacing(5, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    borderTop: '1px solid #ddd',
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Avatar></Avatar>
        <Typography component="h1" variant="h5" align="center">
          <Box mt={2} mb={1}>
            เข้าสู่ระบบ
          </Box>
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
          />
          <Button
            variant="contained"
            color="primary"
            className={`${classes.padding} ${classes.margin}`}
            fullWidth
          >
            เข้าสู่ระบบ
          </Button>
        </form>

        <Divider />
        <Link href="#" color="primary" variant="body1">
          สมัครสมาชิก
        </Link>
      </div>
    </Container>
  );
};

export default LoginForm;
