import React, { useState } from 'react';
import API from 'api';

// change path
import { useHistory } from 'react-router-dom';

// material ui components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

// custom color
import colors from 'styles/colors';

// custom component
import SubmitButton from 'components/SubmitButton';

// type
import { Login } from 'type.model';

// utils
import { setCookie } from 'utils/cookie';

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

const LoginPage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const classes = useStyles();
  const history = useHistory();
  const messageColor: any = isError ? 'error' : 'inherit';

  const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      userid: username,
      password: password,
    };

    API.post<Login>('tokens', data)
      .then((response) => {
        if (response.status === 200 || 201) {
          const token = response.data.token;
          setCookie('token', token, 1);
          setMessage('');
          setIsError(false);
          setUsername('');
          setPassword('');
          history.push('/todo');
        }
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setMessage('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      });
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Avatar></Avatar>
      <Typography component="h1" variant="h5" align="center">
        <Box mt={2} mb={1}>
          เข้าสู่ระบบ
        </Box>
      </Typography>
      <form onSubmit={loginHandler}>
        <TextField
          variant="outlined"
          error={isError}
          required
          fullWidth
          className={classes.textField}
          id="username"
          label="ชื่อผู้ใช้"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={usernameChangeHandler}
          value={username}
        />
        <TextField
          variant="outlined"
          error={isError}
          required
          fullWidth
          className={classes.textField}
          type="password"
          id="password"
          label="รหัสผ่าน"
          name="password"
          autoComplete="password"
          onChange={passwordChangeHandler}
          value={password}
        />
        <Typography
          component="h1"
          variant="body1"
          align="center"
          color={messageColor}
        >
          <Box mb={2}>{message}</Box>
        </Typography>

        <SubmitButton message="เข้าสู่ระบบ" />
      </form>
    </Container>
  );
};

export default LoginPage;
