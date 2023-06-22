import {
    //Card,
    //Table,
    Stack,
    //Avatar,
    //Button,
    //Checkbox,
    //TableRow,
    //TableBody,
    //TableCell,
    Container,
    Typography,
    //TableContainer,
    //TablePagination
} from '@mui/material';

//import { Modal, Row, Tab, Col, Nav } from 'react-bootstrap';
//import { Icon } from '@iconify/react';
//import plusFill from '@iconify/icons-eva/plus-fill';
//import trash from '@iconify/icons-eva/trash-2-fill';
//import editfill from '@iconify/icons-eva/edit-fill';
//import Label from '../../../components/Label';
import Page from '../../../components/Page';
//import DataTable from 'react-data-table-component';
//import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
//import '../../../assets/css/style.scss';
import { Link } from 'react-router-dom';

export default function Settings() {
    const cardStyle ={
        // borderRadius:'1.25rem'
    }
    return (
        <>

            <Page title="Settings | CMS">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Settings
                        </Typography>

                    </Stack>
              
                        <div className="row-cols-1 row-cols-md-2 g-2 row">
                            <div className="col">
                                <div className="hover-scale-up h-100 card" style={cardStyle}>
                                    <div className="card-body">
                                        <div className="g-0 row">
                                            <div className="col-auto">
                                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center  mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: "22px" }}><path fill='green' d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/></svg>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex flex-column ps-card justify-content-start">
                                                    <div className="d-flex flex-column justify-content-center mb-2"><Link className="heading text-primary stretched-link" to="/admin/setting/general">General</Link></div>
                                                    {/* <div className="text-alternate">Lollipop apple pie lollipop toffee croissant. Sugar plum fruitcake cotton candy lemon drops. Carrot cake fruitcake dragée pie cotton candy sesame snaps lollipop croissant.</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div className="col">
                                <div className="hover-scale-up h-100 card" style={cardStyle}>
                                    <div className="card-body">
                                        <div className="g-0 row">
                                            <div className="col-auto">
                                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center  mb-4">
                                                {/* <i className="fa fa-shield" aria-hidden="true"></i> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: "22px" }}><path fill='green' d="M223.7 130.8L149.1 7.77C147.1 2.949 141.9 0 136.3 0H16.03c-12.95 0-20.53 14.58-13.1 25.18l111.3 158.9C143.9 156.4 181.7 137.3 223.7 130.8zM256 160c-97.25 0-176 78.75-176 176S158.8 512 256 512s176-78.75 176-176S353.3 160 256 160zM348.5 317.3l-37.88 37l8.875 52.25c1.625 9.25-8.25 16.5-16.63 12l-46.88-24.62L209.1 418.5c-8.375 4.5-18.25-2.75-16.63-12l8.875-52.25l-37.88-37C156.6 310.6 160.5 299 169.9 297.6l52.38-7.625L245.7 242.5c2-4.25 6.125-6.375 10.25-6.375S264.2 238.3 266.2 242.5l23.5 47.5l52.38 7.625C351.6 299 355.4 310.6 348.5 317.3zM495.1 0H375.7c-5.621 0-10.83 2.949-13.72 7.77l-73.76 122.1c42 6.5 79.88 25.62 109.5 53.38l111.3-158.9C516.5 14.58 508.9 0 495.1 0z"/></svg>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex flex-column ps-card justify-content-start">
                                                    <div className="d-flex flex-column justify-content-center mb-2"><Link className="heading text-primary stretched-link" to="/admin/setting/rank">Rank</Link></div>
                                                    {/* <div className="text-alternate">Cheesecake bonbon chocolate bar. Tart sugar plum candy canes toffee sweet roll muffin oat cake. Chupa chups cookie icing tart tiramisu chocolate cake.</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          <div className="col">
                                <div className="hover-scale-up h-100 card" style={cardStyle}>
                                    <div className="card-body">
                                        <div className="g-0 row">
                                            <div className="col-auto">
                                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center  mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cs-icon folders text-primary">
                                                        <path d="M18 15 18 5C18 4.06812 18 3.60218 17.8478 3.23463 17.6448 2.74458 17.2554 2.35523 16.7654 2.15224 16.3978 2 15.9319 2 15 2 14.0681 2 13.6022 2 13.2346 2.15224 12.7446 2.35523 12.3552 2.74458 12.1522 3.23463 12 3.60217 12 4.06812 12 5L12 15C12 15.9319 12 16.3978 12.1522 16.7654 12.3552 17.2554 12.7446 17.6448 13.2346 17.8478 13.6022 18 14.0681 18 15 18 15.9319 18 16.3978 18 16.7654 17.8478 17.2554 17.6448 17.6448 17.2554 17.8478 16.7654 18 16.3978 18 15.9319 18 15zM8 15 8 5C8 4.06812 8 3.60218 7.84776 3.23463 7.64477 2.74458 7.25542 2.35523 6.76537 2.15224 6.39782 2 5.93188 2 5 2 4.06812 2 3.60218 2 3.23463 2.15224 2.74458 2.35523 2.35523 2.74458 2.15224 3.23463 2 3.60217 2 4.06812 2 5L2 15C2 15.9319 2 16.3978 2.15224 16.7654 2.35523 17.2554 2.74458 17.6448 3.23463 17.8478 3.60217 18 4.06812 18 5 18 5.93188 18 6.39782 18 6.76537 17.8478 7.25542 17.6448 7.64477 17.2554 7.84776 16.7654 8 16.3978 8 15.9319 8 15z"></path>
                                                        <path d="M15 5 15 11M15 14 15 15M5 5 5 11M5 14 5 15"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex flex-column ps-card justify-content-start">
                                                    <div className="d-flex flex-column justify-content-center mb-2"><Link className="heading text-primary stretched-link" to="/admin/setting/xp">XP</Link></div>
                                                    {/* <div className="text-alternate">Marshmallow donut sweet roll. Wafer tootsie roll gingerbread croissant ice cream. Sweet roll ice cream marzipan croissant soufflé fruitcake.</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div className="col">
                                <div className="hover-scale-up h-100 card" style={cardStyle}>
                                    <div className="card-body">
                                        <div className="g-0 row">
                                            <div className="col-auto">
                                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center  mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 576 512"><path fill='green' d="M528 32h-480C21.49 32 0 53.49 0 80V96h576V80C576 53.49 554.5 32 528 32zM0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48V128H0V432zM368 192h128C504.8 192 512 199.2 512 208S504.8 224 496 224h-128C359.2 224 352 216.8 352 208S359.2 192 368 192zM368 256h128C504.8 256 512 263.2 512 272S504.8 288 496 288h-128C359.2 288 352 280.8 352 272S359.2 256 368 256zM368 320h128c8.836 0 16 7.164 16 16S504.8 352 496 352h-128c-8.836 0-16-7.164-16-16S359.2 320 368 320zM176 192c35.35 0 64 28.66 64 64s-28.65 64-64 64s-64-28.66-64-64S140.7 192 176 192zM112 352h128c26.51 0 48 21.49 48 48c0 8.836-7.164 16-16 16h-192C71.16 416 64 408.8 64 400C64 373.5 85.49 352 112 352z"/></svg>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex flex-column ps-card justify-content-start">
                                                    <div className="d-flex flex-column justify-content-center mb-2"><Link className="heading text-primary stretched-link" to="/admin/setting/plans">Plans</Link></div>
                                                    {/* <div className="text-alternate">Chocolate bar sesame snaps tootsie roll donut apple pie. Tart chocolate cake pastry cupcake croissant chocolate. Gingerbread danish tiramisu.</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="col">
                                <div className="hover-scale-up h-100 card" style={cardStyle}>
                                    <div className="card-body">
                                        <div className="g-0 row">
                                            <div className="col-auto">
                                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center  mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 576 512"><path fill='green' d="M492.4 220.8c-8.9 0-18.7 6.7-18.7 22.7h36.7c0-16-9.3-22.7-18-22.7zM375 223.4c-8.2 0-13.3 2.9-17 7l.2 52.8c3.5 3.7 8.5 6.7 16.8 6.7 13.1 0 21.9-14.3 21.9-33.4 0-18.6-9-33.2-21.9-33.1zM528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM122.2 281.1c0 25.6-20.3 40.1-49.9 40.3-12.2 0-25.6-2.4-38.8-8.1v-33.9c12 6.4 27.1 11.3 38.9 11.3 7.9 0 13.6-2.1 13.6-8.7 0-17-54-10.6-54-49.9 0-25.2 19.2-40.2 48-40.2 11.8 0 23.5 1.8 35.3 6.5v33.4c-10.8-5.8-24.5-9.1-35.3-9.1-7.5 0-12.1 2.2-12.1 7.7 0 16 54.3 8.4 54.3 50.7zm68.8-56.6h-27V275c0 20.9 22.5 14.4 27 12.6v28.9c-4.7 2.6-13.3 4.7-24.9 4.7-21.1 0-36.9-15.5-36.9-36.5l.2-113.9 34.7-7.4v30.8H191zm74 2.4c-4.5-1.5-18.7-3.6-27.1 7.4v84.4h-35.5V194.2h30.7l2.2 10.5c8.3-15.3 24.9-12.2 29.6-10.5h.1zm44.1 91.8h-35.7V194.2h35.7zm0-142.9l-35.7 7.6v-28.9l35.7-7.6zm74.1 145.5c-12.4 0-20-5.3-25.1-9l-.1 40.2-35.5 7.5V194.2h31.3l1.8 8.8c4.9-4.5 13.9-11.1 27.8-11.1 24.9 0 48.4 22.5 48.4 63.8 0 45.1-23.2 65.5-48.6 65.6zm160.4-51.5h-69.5c1.6 16.6 13.8 21.5 27.6 21.5 14.1 0 25.2-3 34.9-7.9V312c-9.7 5.3-22.4 9.2-39.4 9.2-34.6 0-58.8-21.7-58.8-64.5 0-36.2 20.5-64.9 54.3-64.9 33.7 0 51.3 28.7 51.3 65.1 0 3.5-.3 10.9-.4 12.9z"/></svg>
                                            
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex flex-column ps-card justify-content-start">
                                                    <div className="d-flex flex-column justify-content-center mb-2"><Link className="heading text-primary stretched-link" to="/admin/setting/payment">Payment</Link></div>
                                                    {/* <div className="text-alternate">Halvah jujubes bonbon gummies caramels. Carrot cake pie caramels caramels. Wafer tootsie roll gingerbread croissant ice cream.</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="hover-scale-up h-100 card" style={cardStyle}>
                                    <div className="card-body">
                                        <div className="g-0 row">
                                            <div className="col-auto">
                                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center  mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 576 512"><path fill='green' d="M568.2 336.3c-13.12-17.81-38.14-21.66-55.93-8.469l-119.7 88.17h-120.6c-8.748 0-15.1-7.25-15.1-15.99c0-8.75 7.25-16 15.1-16h78.25c15.1 0 30.75-10.88 33.37-26.62c3.25-20-12.12-37.38-31.62-37.38H191.1c-26.1 0-53.12 9.25-74.12 26.25l-46.5 37.74L15.1 383.1C7.251 383.1 0 391.3 0 400v95.98C0 504.8 7.251 512 15.1 512h346.1c22.03 0 43.92-7.188 61.7-20.27l135.1-99.52C577.5 379.1 581.3 354.1 568.2 336.3zM279.3 175C271.7 173.9 261.7 170.3 252.9 167.1L248 165.4C235.5 160.1 221.8 167.5 217.4 179.1s2.121 26.2 14.59 30.64l4.655 1.656c8.486 3.061 17.88 6.095 27.39 8.312V232c0 13.25 10.73 24 23.98 24s24-10.75 24-24V221.6c25.27-5.723 42.88-21.85 46.1-45.72c8.688-50.05-38.89-63.66-64.42-70.95L288.4 103.1C262.1 95.64 263.6 92.42 264.3 88.31c1.156-6.766 15.3-10.06 32.21-7.391c4.938 .7813 11.37 2.547 19.65 5.422c12.53 4.281 26.21-2.312 30.52-14.84s-2.309-26.19-14.84-30.53c-7.602-2.627-13.92-4.358-19.82-5.721V24c0-13.25-10.75-24-24-24s-23.98 10.75-23.98 24v10.52C238.8 40.23 221.1 56.25 216.1 80.13C208.4 129.6 256.7 143.8 274.9 149.2l6.498 1.875c31.66 9.062 31.15 11.89 30.34 16.64C310.6 174.5 296.5 177.8 279.3 175z"/></svg>
                                                   
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex flex-column ps-card justify-content-start">
                                                    <div className="d-flex flex-column justify-content-center mb-2"><Link className="heading text-primary stretched-link" to="/admin/setting/pricing">Pricing</Link></div>
                                                    {/* <div className="text-alternate">Dessert sweet roll cake lollipop. Jelly-o danish donut tiramisu biscuit toffee tart tootsie roll lemon drops. Lemon drops powder.</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col">
                                <div className="hover-scale-up h-100 card" style={cardStyle}>
                                    <div className="card-body">
                                        <div className="g-0 row">
                                            <div className="col-auto">
                                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center  mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cs-icon file-text text-primary">
                                                        <path d="M6.5 18H13.5C14.9045 18 15.6067 18 16.1111 17.6629C16.3295 17.517 16.517 17.3295 16.6629 17.1111C17 16.6067 17 15.9045 17 14.5V7.44975C17 6.83775 17 6.53175 16.9139 6.24786C16.8759 6.12249 16.8256 6.00117 16.7638 5.88563C16.624 5.62399 16.4076 5.40762 15.9749 4.97487L14.0251 3.02513L14.0251 3.02512C13.5924 2.59238 13.376 2.37601 13.1144 2.23616C12.9988 2.1744 12.8775 2.12415 12.7521 2.08612C12.4682 2 12.1622 2 11.5503 2H6.5C5.09554 2 4.39331 2 3.88886 2.33706C3.67048 2.48298 3.48298 2.67048 3.33706 2.88886C3 3.39331 3 4.09554 3 5.5V14.5C3 15.9045 3 16.6067 3.33706 17.1111C3.48298 17.3295 3.67048 17.517 3.88886 17.6629C4.39331 18 5.09554 18 6.5 18Z"></path>
                                                        <path d="M13 6 7 6M13 10 7 10M13 14 7 14"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex flex-column ps-card justify-content-start">
                                                    <div className="d-flex flex-column justify-content-center mb-2"><a className="heading text-primary stretched-link" href="/settings/general">Billing</a></div>
                                                    <div className="text-alternate">Macaroon candy ice cream candy canes chocolate bar sesame snaps jelly pudding caramels. Dragée macaroon lemon drops icing cupcake gingerbread.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="hover-scale-up h-100 card" style={cardStyle}>
                                    <div className="card-body">
                                        <div className="g-0 row">
                                            <div className="col-auto">
                                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center  mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cs-icon content text-primary">
                                                        <path d="M3 5.5C3 4.09554 3 3.39331 3.33706 2.88886C3.48298 2.67048 3.67048 2.48298 3.88886 2.33706C4.39331 2 5.09554 2 6.5 2H13.5C14.9045 2 15.6067 2 16.1111 2.33706C16.3295 2.48298 16.517 2.67048 16.6629 2.88886C17 3.39331 17 4.09554 17 5.5V14.5C17 15.9045 17 16.6067 16.6629 17.1111C16.517 17.3295 16.3295 17.517 16.1111 17.6629C15.6067 18 14.9045 18 13.5 18H6.5C5.09554 18 4.39331 18 3.88886 17.6629C3.67048 17.517 3.48298 17.3295 3.33706 17.1111C3 16.6067 3 15.9045 3 14.5V5.5Z"></path>
                                                        <path d="M7 6.75C7 6.04777 7 5.69665 7.16853 5.44443C7.24149 5.33524 7.33524 5.24149 7.44443 5.16853C7.69665 5 8.04777 5 8.75 5H11.25C11.9522 5 12.3033 5 12.5556 5.16853C12.6648 5.24149 12.7585 5.33524 12.8315 5.44443C13 5.69665 13 6.04777 13 6.75V7.25C13 7.95223 13 8.30335 12.8315 8.55557C12.7585 8.66476 12.6648 8.75851 12.5556 8.83147C12.3033 9 11.9522 9 11.25 9H8.75C8.04777 9 7.69665 9 7.44443 8.83147C7.33524 8.75851 7.24149 8.66476 7.16853 8.55557C7 8.30335 7 7.95223 7 7.25V6.75Z"></path>
                                                        <path d="M7 12H13M7 15H13"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex flex-column ps-card justify-content-start">
                                                    <div className="d-flex flex-column justify-content-center mb-2"><a className="heading text-primary stretched-link" href="/settings/general">Taxes</a></div>
                                                    <div className="text-alternate">Dragée macaroon lemon drops icing cupcake gingerbread. Apple pie caramels tart. Caramels brownie gummies.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                </Container>
            </Page>

        </>
    );
}
