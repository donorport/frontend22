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
    { name: 'Name', selector: 'headline', sortable: true },
    {
      name: 'Category',
      cell: (row) => (
        <>
          {/* {console.log(row)} */}
          {/* <span className={row.status === 1 ? "badge badge-success" : "badge badge-danger"}>{row.status === 1 ? 'Active' : 'Inactive'}</span> */}
          <Label variant="ghost" color="info">
            {row.categoryDetails?.name}
          </Label>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true
    },

    // { name: "Email", selector: "email", sortable: true },
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
      name: 'Campaign',
      cell: (row) => (
        <>
          {/* {console.log(row)} */}
          {/* <span className={row.status === 1 ? "badge badge-success" : "badge badge-danger"}>{row.status === 1 ? 'Active' : 'Inactive'}</span> */}
          <Label variant="ghost" color="primary">
            {row.campaignDetails?.name}
          </Label>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true
    },
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

    // {
    //     name: "SubCategory",
    //     cell: (row) => <>
    //         <button className="btn btn-primary btn-sm" onClick={(e) => props.viewSubCategory(row._id)}>View</button>&nbsp;
    //         {/* <button className="btn btn-sm btn-primary" onClick={() => props.editCategory(row)}><Icon icon={editfill} /></button> */}
    //     </>,
    //     ignoreRowClick: true,
    //     allowOverflow: true,
    //     button: true,
    // },
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
          {/* <button className="btn btn-danger btn-sm" onClick={(e) => props.deleteProduct(row._id)}><Icon icon={trash} /></button>&nbsp; */}
          <button className="btn btn-sm btn-primary" onClick={() => props.editProduct(row)}>
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
  if (props.productList && props.productList.length > 0) {
    props.productList.map((user) => {
      data.push(user);
    });

    const log_data_indicesWithoutLatLng = data.reduce((accum, item, index) => {
      if (item.lat === '' && item.lng === '') {
        const newIndices = accum.indices;
        newIndices.push(index);

        const newItems = accum.items;
        newItems.push(item);

        return {indices: newIndices, items: newItems};
      }
      return accum;
    }, {indices: [], items: []})

    console.log({data, log_data_indicesWithoutLatLng});
  }

  const tableData = {
    columns,
    data,
    export: false,
    print: false
  };
  return (
    <Page title="Products | CMS">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => props.openModel()}
          >
            Add Products
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
