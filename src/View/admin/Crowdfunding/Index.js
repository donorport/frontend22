import { Card, Stack, Button, Container, Typography } from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import editfill from '@iconify/icons-eva/edit-fill';
import Label from '../../../components/Label';

import { Icon } from '@iconify/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import moment from 'moment';

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
      id: 'created_at',
      name: 'Date',
      selector: 'created_at',
      cell: (row) => <div>{moment(row.created_at).format('DD MMMM YYYY ')}</div>,
      sortable: true,
      accessor: ''
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          {/* <button className="btn btn-danger btn-sm" onClick={(e) => props.deleteCrowdfunding(row._id)}><Icon icon={trash} /></button>&nbsp; */}
          <button className="btn btn-sm btn-primary" onClick={() => props.editCrowdfunding(row)}>
            <Icon icon={editfill} />
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const data = props.crowdfundingList || [];

  const tableData = {
    columns,
    data,
    export: false,
    print: false
  };

  return (
    <Page title="Crowdfunding | CMS">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
Crowdfunding
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => props.openModel()}
          >
            Add Crowdfunding Campaign
          </Button>
        </Stack>
        <Card>
          <DataTableExtensions {...tableData}>
            <DataTable
              columns={columns}
              data={data}
              noHeader
              defaultSortFieldId="created_at"
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
