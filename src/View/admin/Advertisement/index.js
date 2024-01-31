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

        {
            name: "Logo",
            cell: (row) => <>
                <img src={helper.sponsorLogoResizePath + row.logo} alt='sponsor' style={{ width: "50px" }}></img>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        { id: 'name', name: "Name", selector: "name", sortable: true },


        {
            id: 'created_at',
            name: 'Date',
            selector: 'created_at',
            cell: row => <div>{moment(row.created_at).format("DD MMMM YYYY ")}</div>,
            sortable: true,
        },
        {
            name: "Status",
            cell: (row) => <>
                {/* <span className={row.status === 1 ? "badge badge-success" : "badge badge-danger"}>{row.status === 1 ? 'Active' : 'Inactive'}</span> */}
                <Label
                    variant="ghost"
                    color={(row.status === 1 && 'success') || 'error'}
                >
                    {row.status === 1 ? "Active" : "Inactive"}
                </Label>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },

        {
            id: 'action',
            name: "Actions",
            cell: (row) => <>
                <button className="btn btn-danger btn-sm" onClick={(e) => props.deleteAd(row._id)}><Icon icon={trash} /></button>&nbsp;

                <button className="btn btn-sm btn-primary" onClick={() => props.editAd(row)}><Icon icon={editfill} /></button>&nbsp;

                <button className="btn btn-info btn-sm" onClick={(e) => props.adSetting(row)}><Icon icon='dashicons:welcome-view-site' /></button>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        },


    ];
    const data = [];
    if (props.advertiseList && props.advertiseList.length > 0) {
        props.advertiseList.map((order) => {
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
                        Advertisements
                    </Typography>
                    <Button
                        variant="outline"
                        startIcon={<Icon icon={plusFill} />}
                        onClick={() => props.openModel()}
                    >
                        Create Advertisement
                    </Button>
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