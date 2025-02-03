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
      data = data.filter((item) => item.countryDetails?.currency === selectedCountry);
    }

    // Sort by created_at (newest first)
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setFilteredData(data);
  };

  // Custom table styles for wrapping in other columns
  const customStyles = {
    table: {
      style: {
        tableLayout: 'auto', // let columns auto-size rather than fixed
        width: '100%'
      }
    },
    headCells: {
      style: {
        whiteSpace: 'nowrap'
      }
    },
    cells: {
      style: {
        whiteSpace: 'normal',
        wordWrap: 'break-word'
      }
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      wrap: true,
      minWidth: '150px'
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true
    },
    {
      name: 'Organization User Name',
      selector: 'organizationUserName',
      sortable: true,
      wrap: true,
      minWidth: '160px'
    },
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
              [...new Set(props.campaignAdminList.map((item) => item.countryDetails?.currency))].map(
                (country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                )
              )}
          </Select>
        </FormControl>
      ),
      selector: (row) => row.countryDetails?.currency || '',
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
      allowOverflow: true,
      // Restrict width so the label fits exactly
      style: {
        width: '80px',
        minWidth: '80px'
      },
      wrap: false
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
      sortable: true,
      // Restrict width here as well
      style: {
        width: '80px',
        minWidth: '80px'
      },
      wrap: false
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
      id: 'created_at'
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => props.deleteCampaignAdmin(row._id)}
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
    
    // Get headers
    const headers = columns.map((col) =>
      typeof col.name === 'string' ? col.name : 'Country'
    );
    csvRows.push(headers.join(','));

    // Get data rows
    filteredData.forEach((row) => {
      const values = columns.map((col) => {
        if (typeof col.selector === 'function') {
          const val = col.selector(row);
          return `"${(val || '').toString().replace(/"/g, '""')}"`;
        } else if (typeof col.selector === 'string') {
          // Handle nested selectors
          const keys = col.selector.split('.');
          let value = row;
          keys.forEach((key) => {
            value = value?.[key];
          });
          return `"${(value || '').toString().replace(/"/g, '""')}"`;
        }
        // Handle columns without direct selector
        switch (col.name) {
          case 'Applied?':
            return row.status === 1 ? '"Active"' : '"Inactive"';
          case 'Status':
            return row.otp_status === 1 ? '"Active"' : '"Inactive"';
          case 'Bank?':
            return row.bankaccounts && row.bankaccounts.length > 0 ? '"Active"' : '"Inactive"';
          case 'OTP':
            return `"${(row.otp || '').toString().replace(/"/g, '""')}"`;
          case 'Date':
            return `"${moment(row.created_at).format('DD MMMM YYYY')}"`;
          default:
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

  // Prepare data for DataTableExtensions
  const tableData = {
    columns,
    data: filteredData
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

          <DataTableExtensions
            {...tableData}
            draggableColumns={{ enabled: true }} // If you want columns draggable
          >
            <DataTable
              noHeader
              defaultSortAsc={false}
              customStyles={customStyles}
              highlightOnHover
              defaultSortFieldId="created_at"
              pagination
              paginationPerPage={rowsPerPage}
              paginationRowsPerPageOptions={[10, 20, 50, 100]}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </DataTableExtensions>
        </Card>
      </Container>
    </Page>
  );
}
