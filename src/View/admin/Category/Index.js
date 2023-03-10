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
    const dot = {
        height: '25px',
        width: '25px',

        borderRadius: '50%',
        display: 'inline-block',
    }
    const columns = [

        { name: "Name", selector: "name", sortable: true },


        {
            name: "Icon",
            cell: (row) => 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
                    <path fill={row.color} d={row.icon}></path> </svg>
                ,
                ignoreRowClick: true,
                allowOverflow: true,
        },



        // {name: "Color", selector: "color", sortable: true },
                {
                    name: "Color",
            cell: (row) => <>
                    <span className="dot" style={{ ...dot, backgroundColor: row.color, }}></span>
                </>,
                ignoreRowClick: true,
                allowOverflow: true,
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
                    name: "SubCategory",
            cell: (row) => <>
                    <button className="btn btn-primary btn-sm" onClick={(e) => props.viewSubCategory(row._id)}>View</button>&nbsp;
                    {/* <button className="btn btn-sm btn-primary" onClick={() => props.editCategory(row)}><Icon icon={editfill} /></button> */}
                </>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
        },

                {
                    name: "Actions",
            cell: (row) => <>
                    <button className="btn btn-danger btn-sm" onClick={(e) => props.deleteCategory(row._id)}><Icon icon={trash} /></button>&nbsp;
                    <button className="btn btn-sm btn-primary" onClick={() => props.editCategory(row)}><Icon icon={editfill} /></button>
                </>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
        },
                ];
                const data = [];
    if (props.category && props.category.length > 0) {
                    props.category.map((user) => {
                        data.push(user);
                    },
                    );
    };
                // console.log(data);

                const tableData = {
                    columns,
                    data,
        export: false,
                print: false,
    };
                return (

                <Page title="Category | CMS">

                    <Container>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                            <Typography variant="h4" gutterBottom>
                                Category
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<Icon icon={plusFill} />}
                                onClick={() => props.openModel()}
                            >
                                Add Category
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
                )

}