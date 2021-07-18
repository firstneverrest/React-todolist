import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TodoListPage: React.FC = () => {
  return (
    <Typography component="h2" variant="h3">
      <Box mb={2}>TODO List</Box>
    </Typography>
  );
};

export default TodoListPage;
