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
import backfill from '@iconify/icons-eva/arrow-left-fill';
import Label from '../../../../components/Label';

import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";


import Page from '../../../../components/Page';

export default function Index(props) {

    const columns = [

        { name: "Name", selector: "name", sortable: true },


        {
            name: "Icon",
            cell: (row) => 
            <span className="sw-icon icon--default-symbol-euro sw-icon--fill">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
                    <path  fill="#758CA3" d={row.icon}></path> </svg>
                    </span>
                ,
                ignoreRowClick: true,
                allowOverflow: true,
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
            name: "Actions",
            cell: (row) => <>
                <button className="btn btn-danger btn-sm" onClick={(e) => props.deleteSubCategory(row._id)}><Icon icon={trash} /></button>&nbsp;
                <button className="btn btn-sm btn-primary" onClick={() => props.editSubCategory(row)}><Icon icon={editfill} /></button>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    const data = [];
    if (props.subcategory && props.subcategory.length > 0) {
        props.subcategory.map((s) => {
            data.push(s);
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

        <Page title="SubCategory | CMS">

            <Container>

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        SubCategory : {props.categoryName}
                    </Typography>
                    <Stack direction="row" justifyContent="center" >
                    <Button
                            variant="contained"
                            startIcon={<Icon icon={backfill} />}
                            onClick={() => props.navigate('/admin/category')}
                        >
                            Back
                        </Button>&nbsp;
                        <Button
                            variant="contained"
                            startIcon={<Icon icon={plusFill} />}
                            onClick={() => props.openModel()}
                        
                        >
                            Add SubCategory
                        </Button>

                     
                    </Stack>

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