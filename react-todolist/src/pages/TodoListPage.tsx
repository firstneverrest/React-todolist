import React, { useState, useEffect } from 'react';
import API from 'api';

// components
import Table from 'components/Table';

// material ui
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

// interface
import { TableColumns, TableTask } from 'type.model';

// change path
import { useHistory } from 'react-router-dom';

// utils
import { getCookie, logout } from 'utils';

// colors
import colors from 'styles/colors';

const TodoListPage: React.FC = () => {
  // table columns
  const columns: TableColumns[] = [
    {
      title: 'สิ่งที่ต้องทำ',
      field: 'name',
      validate: (rowData) =>
        rowData.name === '' ? 'กรุณาใส่สิ่งที่ต้องทำ' : '',
    },
    { title: 'วันที่', field: 'when' },
  ];

  // table rows
  const [task, setTask] = useState<TableTask[]>([]);
  const [open, setOpen] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    getTodoList();
    if (getCookie('token').length === 0) {
      history.push('/login');
    }
  }, [history]);

  const getTodoList = () => {
    const token = getCookie('token');

    API.get<TableTask[]>('activities', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => {
        if (response.status === 200) {
          let todoData = response.data;
          setTask(todoData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTodoList = (name: string, when: Date) => {
    const token = getCookie('token');

    const data = {
      name: name,
      when: when,
    };

    API.post('activities', data, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => {
        if (response.status === 201) {
          getTodoList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editTodoList = (id: number, name: string, when: Date) => {
    const token = getCookie('token');

    const data = {
      name: name,
      when: when,
    };

    API.put('activities/' + id, data, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => {
        if (response.status === 201) {
          getTodoList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodoList = (id: number) => {
    const token = getCookie('token');

    API.delete('activities/' + id, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => {
        if (response.status === 201) {
          getTodoList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logoutHandler = () => {
    logout();
    history.push('/login');
  };

  const options = {
    actionsColumnIndex: -1,
    headerStyle: {
      backgroundColor: colors.darkPurple,
      color: colors.white,
      fontSize: '16px',
    },
    rowStyle: {
      fontFamily: ['Kanit', 'sans-serif'].join(','),
    },
  };

  const localization = {
    pagination: {
      labelDisplayedRows: '{from}-{to} จาก {count}',
      labelRowsSelect: 'แถว',
    },
    header: {
      actions: '',
    },
    body: {
      emptyDataSourceMessage: 'ไม่มีรายการสิ่งที่ต้องทำ',
      editRow: { deleteText: 'ท่านต้องการลบรายการนี้ใช่หรือไม่' },
    },
  };

  const editable = {
    onRowAdd: (newTask: TableTask) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setTask([...task, newTask]);
          addTodoList(newTask.name, newTask.when);
          resolve('');
        }, 500);
      }),
    onRowUpdate: (newTask: TableTask, oldTask: TableTask) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const taskUpdate = [...task];
          const index: any = oldTask?.tableData?.id;
          taskUpdate[index] = newTask;
          setTask([...taskUpdate]);
          editTodoList(newTask.id, newTask.name, newTask.when);
          resolve('');
        }, 500);
      }),
    onRowDelete: (oldTask: TableTask) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const taskDelete = [...task];
          const index: any = oldTask?.tableData?.id;
          taskDelete.splice(index, 1);
          setTask([...taskDelete]);
          deleteTodoList(oldTask.id);
          resolve('');
        }, 500);
      }),
  };

  return (
    <>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Login Successfully!
        </Alert>
      </Collapse>
      <Box mt={2} mr={4} display="flex" justifyContent="flex-end">
        <IconButton color="primary" onClick={logoutHandler}>
          <ExitToAppIcon />
        </IconButton>
      </Box>
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <Box mb={2}>
          <Typography component="h1" variant="h4">
            ตารางแสดงรายการสิ่งที่ต้องทำ
          </Typography>
        </Box>
        <Table
          title="รายการสิ่งที่ต้องทำ"
          columns={columns}
          data={task}
          editable={editable}
          localization={localization}
          options={options}
        />
      </Box>
    </>
  );
};

export default TodoListPage;
