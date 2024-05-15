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
import { Link as RouterLink, useNavigate, useLocation, useParams } from 'react-router-dom';
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


export default function StateSalesTax(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [taxList, setTaxList] = useState([])
    const location = useLocation();
    const params = useParams();

    const [countryName, setCountryName] = useState('')

    const [editStateId, setEditStateId] = useState(0)



    const [selectedCountryData, setSelectedCountryData] = useState({
        salesTax: '',
        countryId: Number(params.countryId),
        stateId: 0


    })
    const Field = (value, name, className) => {
        return (
            <input
                value={value}
                name={name} className={className} onChange={(e) => onChange(e)} type="text" autoFocus />

        )
    }


    const getCountryStateTaxList = async () => {
        let data = {}
        data.countryId = Number(params.countryId)
        const getTaxList = await salesTaxApi.listStateTaxlist(adminAuthToken, data)
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
            stateId: data.stateId
        })
    
        setEditStateId(data.stateId)
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

    const updateStateSalesTax = async () => {
        if (selectedCountryData.salesTax === '') {
            ToastAlert({ msg: 'Sales Tax is required', msgType: 'error' });

        } else {
            setLoading(false)
            let data = {}
            // data.salesTax = editCountryTax
            // data.all = selectedCountryData.all
            // data.countryId = selectedCountryData.countryId

            const updateValue = await salesTaxApi.saveStateTaxlist(adminAuthToken, selectedCountryData)
            if (updateValue) {

                if (updateValue.data.success) {
                    ToastAlert({ msg: updateValue.data.message, msgType: 'success' });
                    setSelectedCountryData({
                        ...selectedCountryData,
                        salesTax: '',
                        StateId: 0

                    })
                    setEditStateId(0)
                    await getCountryStateTaxList()
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
            await getCountryStateTaxList()
            setLoading(false)
            setCountryName(location.state.countryName)
        })()
    }, [])

    const columns = [

        { name: "State", selector: "stateDetails.state", sortable: true },

        {
            name: "Salex Tax",
            // sortable: true,
            cell: (row) => <>
                {
                    editStateId === row.stateId ?
                     
                        Field(selectedCountryData.salesTax, "salesTax", "form-control",)
               

                        :
                        <span>{row.salesTax} %</span>

                }
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },



        {
            name: "Actions",
            cell: (row) => <>
                {
                    editStateId !== row.stateId ?
                        <>
                            <button className="btn btn-sm btn-primary" onClick={() => editData(row)}><Icon icon={editfill} /></button>&nbsp;
                        </>

                        :
                        <>
                            <button className="btn btn-sm btn-primary" onClick={() => updateStateSalesTax()}><Icon icon='fa-solid:save' /></button>&nbsp;
                        </>

                }

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

     
            <Page title="Setting |Sales-Tax">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Sales Tax : {countryName}
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Icon icon={backfill} />}
                            onClick={() => navigate('/admin/setting/sales-tax')}
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