import {
  Card,
  //Table,
  Stack,
  //Avatar,
  Button,
  //Checkbox,
  //TableRow,
  //TableBody,
  //TableCell,
  Container,
  Typography
  //TableContainer,
  //TablePagination
} from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import trash from '@iconify/icons-eva/trash-2-fill';
import editfill from '@iconify/icons-eva/edit-fill';
import Label from '../../../components/Label';

import { Icon } from '@iconify/react';
//import { Link as RouterLink } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import Page from '../../../components/Page';

export default function Index(props) {
  const columns = [
    { name: 'Name', selector: 'name', sortable: true },

    {
      name: 'Status',
      cell: (row) => (
        <>
          <Label variant="ghost" color={(row.status === 1 && 'success') || 'error'}>
            {row.status === 1 ? 'Active' : 'Inactive'}
          </Label>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true
    },

    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button className="btn btn-danger btn-sm" onClick={() => props.deleteCms(row._id)}>
            <Icon icon={trash} />
          </button>
          &nbsp;
          <button className="btn btn-sm btn-primary" onClick={() => props.editCms(row)}>
            <Icon icon={editfill} />
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];
  const data = [];
  if (props.cmsList && props.cmsList.length > 0) {
    props.cmsList.map((cms) => {
      data.push(cms);
    });
  }

  const tableData = {
    columns,
    data,
    export: false,
    print: false
  };
  return (
    <Page title="Cms Page | CMS">
      {/* {console.log(data)} */}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Cms List
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => props.openModal()}
          >
            Add Cms Page
          </Button>
        </Stack>
        <Card>
          <DataTableExtensions {...tableData}>
            <DataTable
              columns={columns}
              data={data}
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
          </DataTableExtensions>
        </Card>
      </Container>
    </Page>
  );
}
