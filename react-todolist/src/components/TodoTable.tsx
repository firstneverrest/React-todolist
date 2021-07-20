import React, { useState, useEffect } from 'react';

// material table
import MaterialTable from 'material-table';

// interface
import { TableColumns, TableTask, TodoListData } from 'type.model';

// axios
import axios from 'axios';

// utils
import { getCookie } from 'utils/cookie';

// colors
import colors from 'styles/colors';

const TodoTable: React.FC = () => {
  const columns: TableColumns[] = [
    {
      title: 'สิ่งที่ต้องทำ',
      field: 'name',
      validate: (rowData) =>
        rowData.name === '' ? 'กรุณาใส่สิ่งที่ต้องทำ' : '',
    },
    { title: 'วันที่', field: 'when' },
  ];

  const [task, setTask] = useState<TableTask[]>([]);

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = () => {
    const token = getCookie('token');

    axios
      .get<TodoListData[]>(
        'https://learningportal.ocsc.go.th/todoapi/activities',
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const todoData = response.data;
          // let todoModifiedDate = [];
          // todoModifiedDate = todoData.map((task) => {
          //   return task.when.toString().replace('T', ' ');
          // });
          // console.log(todoModifiedDate);
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

  return (
    <div style={{ maxWidth: '1000px' }}>
      <MaterialTable
        title="รายการสิ่งที่ต้องทำ"
        columns={columns}
        data={task}
        editable={{
          onRowAdd: (newTask) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setTask([...task, newTask]);
                addTodoList(newTask.name, newTask.when);
                resolve('');
              }, 500);
            }),
          onRowUpdate: (newTask: TableTask, oldTask) =>
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
          onRowDelete: (oldTask) =>
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
        }}
        localization={localization}
        options={options}
      />
    </div>
  );
};

export default TodoTable;
