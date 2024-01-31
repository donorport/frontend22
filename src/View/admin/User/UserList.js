import { Card, Stack, Button, Container, Typography } from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import trash from '@iconify/icons-eva/trash-2-fill';
import editfill from '@iconify/icons-eva/edit-fill';
import Label from '../../../components/Label';

import { Icon } from '@iconify/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import moment from 'moment';

import Page from '../../../components/Page';

export default function UserList(props) {
  const columns = [
    { name: 'Name', selector: row => row['name'], sortable: true },
    // { name: "Username", selector: "username", sortable: true },
    { name: 'Email', selector: row => row['email'], sortable: true },
    // {
    //     name: "Role",
    //     cell: (row) => <>
    //         {/* <span className={row.status === 1 ? "badge badge-success" : "badge badge-danger"}>{row.status === 1 ? 'Active' : 'Inactive'}</span> */}
    //         <Label
    //             variant="ghost"
    //             color={(row.role === 2 && 'info') || 'success'}
    //         >
    //             {row.roledetails[0].name}
    //         </Label>
    //     </>,
    //     ignoreRowClick: true,
    //     allowOverflow: true,
    // },
    {
      name: 'Status',
      cell: (row) => (
        <>
          {/* <span className={row.status === 1 ? "badge badge-success" : "badge badge-danger"}>{row.status === 1 ? 'Active' : 'Inactive'}</span> */}
          <Label variant="ghost" color={(row.status === 1 && 'success') || 'error'}>
            {row.status === 1 ? 'Active' : 'Inactive'}
          </Label>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true
    },

    {
      id: 'created_at',
      name: 'Date',
      selector:row => row['created_at'],
      cell: (row) => <div>{moment(row.created_at).format('DD MMMM YYYY ')}</div>,
      sortable: true,
      accessor: ''
    },

    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button className="btn btn-danger btn-sm" onClick={(e) => props.deleteUser(row._id)}>
            <Icon icon={trash} />
          </button>
          &nbsp;
          <button className="btn btn-sm btn-primary" onClick={() => props.getUserRecord(row)}>
            <Icon icon={editfill} />
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const data = (props.userList && props.userList.length > 0) ? props.userList : [];

  const tableData = {
    columns,
    data,
    export: true,
    print: false
  };

  return (
    <Page title="Donor | CMS">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Donors
          </Typography>
          <Button
            variant="outline"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => props.setOpenModal()}
          >
            New Donor
          </Button>
        </Stack>
        <Card>
          <DataTableExtensions {...tableData}>
            <DataTable
              columns={columns}
              data={data}
              noHeader
              defaultSortAsc={false}
              pagination
              highlightOnHover
              defaultSortFieldId="created_at"
            />
          </DataTableExtensions>
        </Card>
      </Container>
    </Page>
  );
}
