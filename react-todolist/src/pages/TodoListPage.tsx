import React, { useState, useEffect } from 'react';

// components
import Table from 'components/Table';

// material ui
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// interface
import { TableColumns, TableTask } from 'type.model';

// axios
import axios from 'axios';

// utils
import { getCookie } from 'utils/cookie';

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

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = () => {
    const token = getCookie('token');

    axios
      .get<TableTask[]>(
        'https://learningportal.ocsc.go.th/todoapi/activities',
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      )
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

    axios
      .post('https://learningportal.ocsc.go.th/todoapi/activities', data, {
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

    axios
      .put('https://learningportal.ocsc.go.th/todoapi/activities/' + id, data, {
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

    axios
      .delete('https://learningportal.ocsc.go.th/todoapi/activities/' + id, {
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
