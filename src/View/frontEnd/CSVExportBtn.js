import { CSVLink, CSVDownload } from "react-csv";

const CSVExportBtn = (props) => {
    const headers = props.headers
    const csvData = props.csvData
    const fileName = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ':' + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ":" + props.prifix + ".csv"
    const label = props.label

    return (
        <CSVLink data={csvData} headers={headers} className="btn btn-info btn-md text-nowrap" filename={fileName}>
            {label}
        </CSVLink>
    )


}

export default CSVExportBtn;