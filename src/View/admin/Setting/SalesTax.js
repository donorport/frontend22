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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Page from '../../../components/Page';
import backfill from '@iconify/icons-eva/arrow-left-fill';
import settingApi from '../../../Api/admin/setting';
import React, { useEffect, useState } from 'react';

import ToastAlert from '../../../Common/ToastAlert';
import { hasPermission } from '../../../Common/Helper';
import salesTaxApi from '../../../Api/admin/salesTax';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";






//   const Field = ({ value,name,className, onChange }) => (
//     <input defaultValue={value} name={name} className={className} onChange={onChange} />
//   );

export default function SalesTax(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [taxList, setTaxList] = useState([])
    const [editCountryId, setEditCountryId] = useState(0)
    const [editCountryTax, setEditCountryTax] = useState(0)


    const [selectedCountryData, setSelectedCountryData] = useState({
        salesTax: '',
        all: false,
        countryId: 0

    })
    const Field = (value, name, className) => {
        return (
            <input
                 value={value} 
                name={name} className={className} onChange={(e) => onChange(e)} type="text" autoFocus  />

        )
    }


    const getCountryTaxList = async () => {
        const getTaxList = await salesTaxApi.list(adminAuthToken)
        if (getTaxList) {
            if (getTaxList.data.success) {
                setTaxList(getTaxList.data.data)
            }
        }

    }

    const editData = (data) => {
        setSelectedCountryData({
            ...selectedCountryData,
            salesTax: data.salesTax,
            all: data.all,
            countryId: data.countryId
        })
        setEditCountryId(data.countryId)
        // setEditCountryTax(data.salesTax)

    }

    const onChange = (e) => {
        let value;
        if (e.target.name === 'all') {
            value = e.target.checked
            setSelectedCountryData({
                ...selectedCountryData,
                [e.target.name]: value,

            })
        } else {
            value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, "");
            // setEditCountryTax(value)

        }
        setSelectedCountryData({
            ...selectedCountryData,
            [e.target.name]: value,

        })

    }

    const updateCountrySalesTax = async () => {
        if (selectedCountryData.salesTax === '') {
            ToastAlert({ msg: 'Sales Tax is required', msgType: 'error' });

        } else {
            setLoading(false)
            let data = {}
            // data.salesTax = editCountryTax
            // data.all = selectedCountryData.all
            // data.countryId = selectedCountryData.countryId

            const updateValue = await salesTaxApi.save(adminAuthToken, selectedCountryData)
            if (updateValue) {

                if (updateValue.data.success) {
                    ToastAlert({ msg: updateValue.data.message, msgType: 'success' });
                    setSelectedCountryData({
                        ...selectedCountryData,
                        salesTax: '',
                        all: false,
                        countryId: 0
                    })
                    setEditCountryId(0)
                    await getCountryTaxList()
                    setLoading(false)
                } else {
                    setLoading(false)
                    ToastAlert({ msg: updateValue.data.message, msgType: 'error' });
                }

            } else {
                setLoading(false)
                ToastAlert({ msg: 'Somethig Went Wrong', msgType: 'error' });

            }
        }

    }


    useEffect(() => {
        (async () => {
            setLoading(false)
            await getCountryTaxList()
            setLoading(false)

        })()
    }, [])

    const columns = [

        { name: "Country", selector: "countryDetails.country", sortable: true },

        {
            name: "Salex Tax",
            // sortable: true,
            cell: (row) => <>
                {
                    editCountryId === row.countryId ?
                        // <input type='text' value={selectedCountryData.salesTax} name="salesTax" className="form-control" onChange={(e) => onChange(e)} />
                        Field(selectedCountryData.salesTax, "salesTax", "form-control",)
                        // <Field
                        //     value={selectedCountryData.salesTax}
                        //     name="salesTax"
                        //     className="form-control"
                        //     onChange={(e) => onChange(e)}
                        // />

                        :
                        <span>{row.salesTax} %</span>

                }
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: "Apply to all state",
            // sortable: true,
            cell: (row) => <>

                {
                    editCountryId === row.countryId ?
                        <div className='p-2'>
                            <label className="--switch mt-1">
                                <input type="checkbox" id="dashboardStats" checked={selectedCountryData.all} name="all" onClick={(e) => onChange(e)} />
                                <span className="--slider">
                                    <i className="fa fa-check"></i>
                                    <i className="fa fa-times"></i>
                                </span>
                            </label>
                        </div>
                        :
                        <Label
                            variant="ghost"
                            color={(row.all && 'success') || 'error'}
                        >
                            {row.all ? "Yes" : "No"}
                        </Label>
                }


            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },


        {
            name: "Actions",
            cell: (row) => <>
                {
                    editCountryId !== row.countryId ?
                        <>
                            <button className="btn btn-sm btn-primary" onClick={() => editData(row)}><Icon icon={editfill} /></button>&nbsp;
                        </>

                        :
                        <>
                            <button className="btn btn-sm btn-primary" onClick={() => updateCountrySalesTax()}><Icon icon='fa-solid:save' /></button>&nbsp;
                        </>

                }

                <button className="btn btn-info btn-sm" onClick={(e) => navigate('/admin/setting/sales-tax/'+row.countryId, { state: { countryName: row.countryDetails.country, } })}>State</button>

            </>,
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        },
    ];


    const data = [];
    if (taxList && taxList.length > 0) {
        taxList.map((tax) => {
            data.push(tax);
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
        <>
           {/*<FrontLoader loading={loading} />*/}
            <Page title="Setting |Sales-Tax">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Sales Tax
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Icon icon={backfill} />}
                            onClick={() => navigate('/admin/setting')}
                        >
                            Back
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

        </>
    )

}