import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
// import DashboardNavbar from './DashboardNavbar';
// import DashboardSidebar from './DashboardSidebar';
// import DashboardApp from 'src/pages/DashboardApp';
// import DashboardApp from 'src/pages/DashboardApp';
// import DashboardNavbar from 'src/layouts/dashboard/DashboardNavbar';
// import DashboardSidebar from 'src/layouts/dashboard/DashboardSidebar';
import DashboardApp from '../pages/DashboardApp';
import DashboardSidebar from '../layouts/dashboard/DashboardSidebar';
import DashboardNavbar from '../layouts/dashboard/DashboardNavbar';
import UserController from '../Controller/admin/UserController';
import CampaignAdminController from '../Controller/admin/CampaignAdminController';
import CategoryController from '../Controller/admin/CategoryController';
import SubCategoryController from '../Controller/admin/SubCategoryController';
import ProductController from '../Controller/admin/ProductController';
import ProfileController from '../Controller/admin/ProfileController';
import SettingController from '../Controller/admin/SettingController';
import Currency from '../View/admin/Setting/Currency';
// import HomePage from '../View/frontEnd/Layout/Home/HomePage';
import ProjectController from '../Controller/admin/ProjectController';
import Rank from '../View/admin/Setting/Rank';
import Xp from '../View/admin/Setting/Xp';
import Plans from '../View/admin/Setting/Plans';
import Payment from '../View/admin/Setting/Payment';
import PricingFees from '../View/admin/Setting/PricingFees';
import Email from '../View/admin/Setting/Email';
import FooterLinks from '../View/admin/Setting/FooterLinks';
import OrderController from '../Controller/admin/OrderController';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));


export default function AdminPrivateRoutes() {
    const [open, setOpen] = useState(false);

    return (
        <RootStyle>
            <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
            <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
            <MainStyle>
                <Routes>
                    <Route exact path="/" element={<DashboardApp />} />
                    <Route exact path="/admin" element={<DashboardApp />} />
                    <Route exact path="/admin/Dashboard" element={<DashboardApp />} />
                    <Route exact path="/admin/user" element={<UserController />} />
                    <Route exact path="/admin/campaign_admin" element={<CampaignAdminController />} />
                    <Route exact path="/admin/category" element={<CategoryController />} />
                    <Route exact path="/admin/category/subcategory/:id" element={<SubCategoryController />} />
                    <Route exact path="/admin/products" element={<ProductController />} />
                    <Route exact path="/admin/projects" element={<ProjectController />} />
                    <Route exact path="/admin/profile" element={<ProfileController />} />
                    <Route exact path="/admin/setting" element={<SettingController />} />
                    <Route exact path="/admin/setting/currency" element={<Currency />} />
                    <Route exact path="/admin/setting/rank" element={<Rank/>} />
                    <Route exact path="/admin/setting/xp" element={<Xp/>} />
                    <Route exact path="/admin/setting/plans" element={<Plans/>} />
                    <Route exact path="/admin/setting/payment" element={<Payment/>} />
                    <Route exact path="/admin/setting/pricing" element={<PricingFees/>} />
                    <Route exact path="/admin/setting/email" element={<Email/>} />
                    <Route exact path="/admin/setting/social" element={<FooterLinks/>} />
                    <Route exact path="/admin/orders" element={<OrderController/>} />







                    {/* <Route exact path="*" element={<HomePage />} /> */}





                </Routes>
            </MainStyle>
        </RootStyle>
    );

}