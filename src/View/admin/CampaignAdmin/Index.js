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
import { useState } from 'react';
import { Icon } from '@iconify/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import moment from 'moment';

import Page from '../../../components/Page';

export default function Index(props) {
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const customStyles = {
    table: {
      style: { display: 'table', tableLayout: 'fixed', width: '100%' } // Set table layout to fixed and 100% width
    }
  };
  const columns = [
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'Email', selector: 'email', sortable: true },
    {
      name: 'Country',
      selector: 'countryDetails.currency',
      sortable: true
    },
    {
      name: 'Applied?',
      cell: (row) => (
        <Label variant="ghost" color={(row.status === 1 && 'success') || 'error'}>
          {row.status === 1 ? 'Active' : 'Inactive'}
        </Label>
      ),
      ignoreRowClick: true,
      allowOverflow: true
    },
    {
      name: 'Status',
      cell: (row) => (
        <Label variant="ghost" color={(row.otp_status === 1 && 'success') || 'error'}>
          {row.otp_status === 1 ? 'Active' : 'Inactive'}
        </Label>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      sortable: true
    },
    {
      name: 'Bank?',
      cell: (row) => (
        <Label
          variant="ghost"
          color={row.bankaccounts && row.bankaccounts.length > 0 ? 'success' : 'error'}
        >
          {row.bankaccounts && row.bankaccounts.length > 0 ? 'Active' : 'Inactive'}
        </Label>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      sortable: true
    },
    {
      name: 'OTP',
      cell: (row) => <Label variant="ghost">{row.otp}</Label>,
      ignoreRowClick: true,
      allowOverflow: true
    },
    {
      name: 'Date',
      selector: 'created_at',
      cell: (row) => <div>{moment(row.created_at).format('DD MMMM YYYY')}</div>,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => props.deleteCampaignAdmin(row._id)}
          >
            <Icon icon={trash} />
          </button>
          &nbsp;
          <button className="btn btn-sm btn-primary" onClick={() => props.getUserRecord(row)}>
            <Icon icon={editfill} />
          </button>
          &nbsp;
          <button className="btn btn-sm btn-info" onClick={() => props.payoutToAdmin(row)}>
            <Icon icon="material-symbols:payments-outline-sharp" />
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true
    }
  ];

  const exportToCSV = () => {
    const csvRows = [];
    // Get the headers
    const headers = columns.map((col) => col.name);
    csvRows.push(headers.join(','));

    // Get the data
    data.forEach((row) => {
      const values = columns.map((col) => {
        const value = row[col.selector] || '';
        return `"${value.toString().replace(/"/g, '""')}"`; // Escape double quotes
      });
      csvRows.push(values.join(','));
    });

    // Create CSV file and trigger download
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
  };

  const data = [];
  if (props.campaignAdminList && props.campaignAdminList.length > 0) {
    props.campaignAdminList.map((user) => {
      data.push(user);
    });
  }
  // console.log(data);

  const tableData = {
    columns,
    data,
    export: true,
    print: false
  };
  return (
    <Page title="Campaign Admin | CMS">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Charities
          </Typography>
          <Button
            variant="outline"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => props.setOpenModal()}
          >
            Invite Campaign Admin
          </Button>
        </Stack>
        <Card>
          <Button variant="contained" color="primary" onClick={exportToCSV}>
            Export to CSV
          </Button>
          <DataTable
            columns={columns}
            data={data}
            noHeader
            defaultSortAsc={false}
            customStyles={customStyles} // Apply custom styles
            pagination
            highlightOnHover
            defaultSortFieldId="created_at"
            paginationPerPage={rowsPerPage}
            paginationRowsPerPageOptions={[10, 20, 50, 100]} // Customize the available options
            onChangeRowsPerPage={handleChangeRowsPerPage} // Handle rows per page change
          />
        </Card>
      </Container>
    </Page>
  );
}
