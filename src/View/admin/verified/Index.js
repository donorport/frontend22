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


import Page from '../../../components/Page';

export default function Index(props) {

    const columns = [

        { name: "Name", selector: "name", sortable: true },
        { name: "Email", selector: "email", sortable: true },

  

        {
            name: "Actions",
            cell: (row) => <>
                <button className="btn btn-info btn-sm" onClick={(e) => props.viewDetails(row)}>View</button>&nbsp;
                {/* <button className="btn btn-sm btn-primary" onClick={() => props.editCms(row)}><Icon icon={editfill} /></button> */}
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },


    ];
    const data = [];
    if (props.inquiryList && props.inquiryList.length > 0) {
        props.inquiryList.map((inquiry) => {
            data.push(inquiry);
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

        <Page title="Verification Inquiries | CMS">
            {/* {console.log(data)} */}

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                    Verification Inquiries
                    </Typography>
                    {/* <Button
                        variant="contained"
                        startIcon={<Icon icon={plusFill} />}
                        onClick={() => props.openModal()}
                    >
                        Add Cms Page
                    </Button> */}
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
    )

}