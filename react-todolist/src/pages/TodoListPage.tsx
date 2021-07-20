import React from 'react';
import Table from 'components/TodoTable';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TodoListPage: React.FC = () => {
  return (
    <>
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <Box mb={2}>
          <Typography component="h1" variant="h4">
            ตารางแสดงรายการสิ่งที่ต้องทำ
          </Typography>
        </Box>
        <Table />
      </Box>
    </>
  );
};

export default TodoListPage;
