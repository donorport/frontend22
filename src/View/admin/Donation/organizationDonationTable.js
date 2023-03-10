import Label from '../../../components/Label';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import moment from 'moment';
import helper, { priceFormat } from '../../../Common/Helper';

export default function OrganizationDonation(props) {


    const columns = [

        // { id: 'name', name: "Name", selector: "userDetails.name", sortable: true },
        {
            id: 'name',
            name: "Name",
            cell: (row) => <>

                {row?.userDetails?.name ? row?.userDetails?.name :row.userId }
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },

        // { id: 'orgName', name: "Organization", selector: "organizationDetails.name", sortable: true },


        {
            id: 'orgName',
            name: "Organization",
            cell: (row) => <>

                {row?.organizationDetails?.name ? row?.organizationDetails?.name :row.typeId }
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
                <span>{(row.currencySymbol ? row.currencySymbol : "$") + priceFormat(row.amount)}</span>
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
        // {
        //     id: 'transactionid',
        //     name: "Transaction Id",
        //     cell: (row) => <>

        //         {row.transactionId}


        //     </>,
        //     ignoreRowClick: true,
        //     // allowOverflow: true,
        // },

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


        // {
        //     id: 'action',
        //     name: "Actions",
        //     cell: (row) => <>
        //         <button className="btn btn-info btn-sm" onClick={(e) => props.viewOrderDetails(row)}>View</button>&nbsp;
        //         {/* <button className="btn btn-sm btn-primary" onClick={() => props.editProduct(row)}><Icon icon={editfill} /></button> */}
        //     </>,
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        // },


    ];
    const data = [];

    if (props.organizationDonationList && props.organizationDonationList.length > 0) {

        props.organizationDonationList.map((item) => {
            data.push(item);
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
    )

}