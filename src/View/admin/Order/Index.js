import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import trash from '@iconify/icons-eva/trash-2-fill';
import editfill from '@iconify/icons-eva/edit-fill';
import Label from '../../../components/Label';

import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import moment from 'moment';
import helper, { priceFormat } from '../../../Common/Helper';


import Page from '../../../components/Page';

export default function Index(props) {

    const columns = [

        { id: 'name', name: "Name", selector: "userDetails.name", sortable: true },

        {
            id: 'trsansection_id',
            name: "Transaction Id",
            cell: (row) => <>

                <span>
                    {row.uniqueTransactionId ? row.uniqueTransactionId : row.transactionId}
                </span>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },

        {
            id: 'transactionStatus',
            name: "Payment Status",
            cell: (row) => <>

                <Label
                    variant="ghost"
                    color={(row.transactionStatus === "succeeded" && 'success') || 'error'}
                >
                    {row.transactionStatus}
                </Label>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            id: 'amount',
            name: "Amount",
            cell: (row) => <>
                <span>{(row.currencySymbol ? row.currencySymbol : "$") + priceFormat(row.total)}</span>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        // {
        //     name: "Date",
        //     cell: (row) => <>
        //         <span>{row.created_at}</span>
        //     </>,
        //     // ignoreRowClick: true,
        //     sortable: true,
        //     // allowOverflow: true,
        // },
        // { name: "Date", selector: "created_at", sortable: true },
        {
            id: 'created_at',
            name: 'Date',
            selector: 'created_at',
            cell: row => <div>{moment(row.created_at).format("DD MMMM YYYY ")}</div>,
            sortable: true,
            accessor: '',
        },


        {
            id: 'action',
            name: "Actions",
            cell: (row) => <>
                <button className="btn btn-info btn-sm" onClick={(e) => props.viewOrderDetails(row)}>View</button>&nbsp;
                {/* <button className="btn btn-sm btn-primary" onClick={() => props.editProduct(row)}><Icon icon={editfill} /></button> */}
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        },


    ];
    const data = [];
    if (props.orderList && props.orderList.length > 0) {
        props.orderList.map((order) => {
            data.push(order);
        },
        );
    };


    const tableData = {
        columns,
        data,
        export: false,
        print: false,
    };



    return (

        <Page title="Order | CMS">
            {/* {console.log(data)} */}

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Order List
                    </Typography>
                    {/* <Button
                        variant="contained"
                        startIcon={<Icon icon={plusFill} />}
                        onClick={() => props.openModel()}
                    >
                        Add Category
                    </Button> */}
                </Stack>
                <Card>
                    <DataTableExtensions {...tableData}>
                        <DataTable
                            columns={columns}
                            data={data}
                            noHeader
                            defaultSortFieldId="created_at"
                            pagination
                            striped
                            highlightOnHover
                            defaultSortAsc={false}



                        />
                    </DataTableExtensions>

                </Card>
            </Container>
        </Page>
    )

}