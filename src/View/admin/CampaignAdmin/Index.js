import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import trash from '@iconify/icons-eva/trash-2-fill';
import editfill from '@iconify/icons-eva/edit-fill';
import Label from '../../../components/Label';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import moment from 'moment';

import Page from '../../../components/Page';

export default function Index(props) {
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    filterData();
  }, [props.campaignAdminList, selectedCountry]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const filterData = () => {
    let data = props.campaignAdminList || [];

    // Filter by selected country
    if (selectedCountry) {
      data = data.filter((item) => item.countryDetails.currency === selectedCountry);
    }

    // Sort by created_at date from newest to oldest
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setFilteredData(data);
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
      name: (
        <FormControl fullWidth>
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            labelId="country-select-label"
            value={selectedCountry}
            onChange={handleCountryChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {props.campaignAdminList &&
              [...new Set(props.campaignAdminList.map((item) => item.countryDetails.currency))].map(
                (country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                )
              )}
          </Select>
        </FormControl>
      ),
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
      sortable: true,
      id: 'created_at' // Add id for sorting
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
    filteredData.forEach((row) => {
      const values = columns.map((col) => {
        if (col.selector) {
          // Handle nested selectors
          const keys = col.selector.split('.');
          let value = row;
          keys.forEach(key => {
            value = value[key];
          });
          return `"${(value || '').toString().replace(/"/g, '""')}"`; // Escape double quotes
        } else if (col.name === 'Applied?') {
          return row.status === 1 ? '"Active"' : '"Inactive"';
        } else if (col.name === 'Status') {
          return row.otp_status === 1 ? '"Active"' : '"Inactive"';
        } else if (col.name === 'Bank?') {
          return row.bankaccounts && row.bankaccounts.length > 0 ? '"Active"' : '"Inactive"';
        } else if (col.name === 'OTP') {
          return `"${(row.otp || '').toString().replace(/"/g, '""')}"`; // Ensure OTP is treated as a string
        } else {
          return '""';
        }
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
            data={filteredData}
            noHeader
            defaultSortAsc={false}
            customStyles={customStyles} // Apply custom styles
            pagination
            highlightOnHover
            defaultSortFieldId="created_at" // Sort by created_at by default
            paginationPerPage={rowsPerPage}
            paginationRowsPerPageOptions={[10, 20, 50, 100]} // Customize the available options
            onChangeRowsPerPage={handleChangeRowsPerPage} // Handle rows per page change
          />
        </Card>
      </Container>
    </Page>
  );
}
