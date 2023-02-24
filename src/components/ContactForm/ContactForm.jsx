import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';

import { messages } from 'components/settings';
import Modal from 'components/Modal/Modal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Filter from 'components/Filter';
import { useFilteredContacts } from 'components/hooks/useFilteredContacts';

import {
  useAddContactMutation,
  useDeleteContactMutation,
} from 'redux/contacts/contacts';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: '№',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Contact name',
  },
  {
    id: 'number',
    numeric: true,
    disablePadding: false,
    label: 'Phone number',
  },
  {
    id: 'deleteContact',
    numeric: true,
    disablePadding: false,
    label: 'Delete',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { contactsCount, allUsersArray } = props;
  const [addContact, { isLoading: addContactIsLoading }] =
    useAddContactMutation();

  return (
    <Toolbar>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Contacts [{contactsCount}]
      </Typography>
      {contactsCount !== 0 && <Filter />}

      <Modal
        title="Add new contact"
        submitButtonName="Add contact"
        icon={<ControlPointIcon fontSize="large" />}
        allUsers={allUsersArray}
        submitForm={addContact}
        isLoading={addContactIsLoading}
      />
    </Toolbar>
  );
}

export default function ContactsTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [deleteById, { isLoading }] = useDeleteContactMutation();
  const { filteredContacts, contacts } = useFilteredContacts();

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = id => {
    if (isLoading) {
      return;
    }
    deleteById(id);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredContacts.length)
      : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          contactsCount={contacts.length}
          allUsersArray={contacts}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={contacts.length}
            />
            {filteredContacts.length !== 0 && (
              <TableBody>
                {stableSort(filteredContacts, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index, _) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const numberByOrder = index + 1;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                          align="right"
                          width={40}
                        >
                          {numberByOrder}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="right">{row.number}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {filteredContacts.length === 0 ? (
          <Box
            sx={{
              width: '100%',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {messages.isEmptyBook}
          </Box>
        ) : (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredContacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

EnhancedTableToolbar.propTypes = {
  contactsCount: PropTypes.number.isRequired,
  allUsersArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
