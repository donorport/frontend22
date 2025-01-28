import React, { useLayoutEffect, lazy } from 'react';
import {
  //BrowserRouter as Router,
  Route,
  Routes,
  useLocation
  //Link as RouterLink
} from 'react-router-dom';

// material
//import { styled } from '@mui/material/styles';

import ForgotPasswordController from '../Controller/frontEnd/ForgotPasswordController';
import SigninController from '../Controller/frontEnd/SigninController';
import SignupController from '../Controller/frontEnd/SignupController';
// import HomePage from '../View/frontEnd/Layout/Home/HomePage';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// import ScrollToTop from '../Controller/frontEnd/ScrollToTop';
//import Login from '../pages/Login';

// import Router from '../routes';
//import Abc from '../pages/Abc';
import ThemeConfig from '../theme';
import ScrollToTop from '../components/ScrollToTop';
import GlobalStyles from '../theme/globalStyles';
import { BaseOptionChartStyle } from '../components/charts/BaseOptionChart';
//import Logo from '../components/Logo';
//import UserPrivateRoutes from './UserPrivateRoutes';
import HomeController from '../Controller/frontEnd/HomeController';
import FrontEndLayOut from './FrontEndLayOut';
import OrganizationDetailsController from '../Controller/frontEnd/OrganizationDetailsController';
import ItemDetailsController from '../Controller/frontEnd/ItemDetailsController';
import ProjectDetailsController from '../Controller/frontEnd/ProjectDetailsController';
import CrowdfundingDetailsController from '../Controller/frontEnd/CrowdfundingDetailsController';
//import FrontEndAuthLayOut from './FrontEndAuthLayout';
// import OrganizationAdminController from '../Controller/frontEnd/OrganizationAdminController';
//import CampaignAdminLayout from './CampaignAdminLayout';
import CartController from '../Controller/frontEnd/CartController';
import CheckoutController from '../Controller/frontEnd/CheckoutController';
import ThankYou from '../View/frontEnd/ThankYou';
//import AdminDashboard from '../View/frontEnd/Component/organisms/admin-dashboard';
//import AdminControl from '../View/frontEnd/Component/organisms/admin-control';
import UserDetail from '../View/frontEnd/user-detail';
import UserDashboard from '../View/frontEnd/Component/organisms/user-dashboard';
import UserItems from '../View/frontEnd/Component/organisms/user-items';
import UserXp from '../View/frontEnd/Component/organisms/user-xp';
import UserTax from '../View/frontEnd/Component/organisms/user-tax';
import UserHistory from '../View/frontEnd/Component/organisms/user-history';
//import UserSettings from '../View/frontEnd/Component/organisms/user-settings';
import UserSettingsTab from '../View/frontEnd/Component/organisms/user-settings-tab';
import UserProfile from '../View/frontEnd/Component/organisms/user-profile';
import UserAccounts from '../View/frontEnd/Component/organisms/user-accounts';
import UserBilling from '../View/frontEnd/Component/organisms/user-billing';
//import UserControl from '../View/frontEnd/Component/organisms/user-control';
import UserAdmin from '../View/frontEnd/Component/organisms/user-admin';
import ResetPasswordController from '../Controller/frontEnd/ResetPasswordController';
import ChangePassword from '../View/frontEnd/change-password';
import ApplyOrganizationController from '../Controller/frontEnd/ApplyOrganizationController';
import AboutController from '../Controller/frontEnd/AboutController';
import Media from '../View/frontEnd/media';
import Landing from '../View/frontEnd/landing';
import Xp from '../View/frontEnd/xp';
import Ranks from '../View/frontEnd/ranks';
import Partnership from '../View/frontEnd/partnership';
import Sponsors from '../View/frontEnd/sponsors';
import ItemTags from '../View/frontEnd/item-tags';
import Help from '../View/frontEnd/help';
import HelpCategory from '../View/frontEnd/help-category';
import HelpArticle from '../View/frontEnd/help-article';
import HelpContact from '../View/frontEnd/help-contact';
import Trust from '../View/frontEnd/trust';
import Fundraisers from '../View/frontEnd/fundraisers';
import PlansController from '../Controller/frontEnd/PlansController';
//import VerifiedDonors from '../View/frontEnd/verified-donors';
import Terms from '../View/frontEnd/terms';
import Privacy from '../View/frontEnd/privacy';
import { CategoryProductsController } from '../Controller/frontEnd/CategoryProductsController';
import LeaderBoard from '../View/frontEnd/Component/organisms/leaderboard';
import OrderConfirmPage from '../View/frontEnd/order-confirmation';
import DonationConfirmPage from '../View/frontEnd/donation-confirmation/index';
import Pricing from '../View/frontEnd/pricing';
import { CircularProgress } from '@mui/material';

// old imports that are now lazy
//import AdminPrivateRoutes from './AdminPrivateRoutes';
import AdminDetail from '../View/frontEnd/admin-detail';
import Payments from '../View/frontEnd/Component/organisms/payment-method';
import AdminPosts from '../View/frontEnd/Component/organisms/admin-posts';
import AdminActivity from '../View/frontEnd/Component/organisms/admin-activity';
import AdminTax from '../View/frontEnd/Component/organisms/admin-tax';
import AdminProjects from '../View/frontEnd/Component/organisms/admin-projects';
import AdminCrowdfundings from '../View/frontEnd/Component/organisms/admin-crowdfundings';
import AdminSettingsTab from '../View/frontEnd/Component/organisms/admin-settings-tab';
import ProfileSettings from '../View/frontEnd/Component/organisms/profile-settings';
import AdminAdmin from '../View/frontEnd/Component/organisms/admin-admin';
import AdminBilling from '../View/frontEnd/Component/organisms/admin-billing';
import ActivationController from '../Controller/frontEnd/ActivationController';


// lazy import for admin routes
const AdminPrivateRoutes = lazy(() => import('./AdminPrivateRoutes'));

//const AdminDetail = lazy(() => import('../View/frontEnd/admin-detail'));
//const Payments = lazy(() => import('../View/frontEnd/Component/organisms/payment-method'));
//const AdminPosts = lazy(() => import('../View/frontEnd/Component/organisms/admin-posts'));
//const AdminActivity = lazy(() => import('../View/frontEnd/Component/organisms/admin-activity'));
//const AdminTax = lazy(() => import('../View/frontEnd/Component/organisms/admin-tax'));
//const AdminProjects = lazy(() => import('../View/frontEnd/Component/organisms/admin-projects'));
//const AdminSettingsTab = lazy(() =>
//import('../View/frontEnd/Component/organisms/admin-settings-tab')
//);
//const ProfileSettings = lazy(() => import('../View/frontEnd/Component/organisms/profile-settings'));
//const AdminAdmin = lazy(() => import('../View/frontEnd/Component/organisms/admin-admin'));
//const AdminBilling = lazy(() => import('../View/frontEnd/Component/organisms/admin-billing'));

//const HeaderStyle = styled('header')(({ theme }) => ({
//top: 0,
//left: 0,
//lineHeight: 0,
//width: '100%',
//position: 'absolute',
//padding: theme.spacing(3, 3, 0),
//[theme.breakpoints.up('sm')]: {
//padding: theme.spacing(5, 5, 0)
//}
//}));

export default function MainRoutes() {
  //const [login, setLogin] = useState(false);
  const adminAuthToken = localStorage.getItem('adminAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');

  const token = tempCampaignAdminAuthToken ? tempCampaignAdminAuthToken : CampaignAdminAuthToken;

  const location = useLocation();

  //useLayoutEffect(() => {
  ////window.scrollTo(0, 0);
  //}, [location.pathname]);
  return (
    <div id="full-content">
      {token && location.pathname.startsWith('/campaign') && (
        <>
          {/*
        <React.Suspense fallback={<LoadingPage />}>
        */}
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<AdminDetail />}>
              <Route path="/campaign/:name/dashboard" element={<Payments />} />
              <Route path="/campaign/:name" element={<Payments />} />
              {/* <Route path="/campaign/:name/dashboard" element={<AdminDashboard />} />
            <Route path="/campaign/:name" element={<AdminDashboard />} /> */}
              <Route path="/campaign/:name/posts" element={<AdminPosts />} />
              <Route path="/campaign/:name/activity" element={<AdminActivity />} />
              <Route path="/campaign/:name/tax" element={<AdminTax />} />
              <Route path="/campaign/:name/project" element={<AdminProjects />} />
              <Route path="/campaign/:name/crowdfunding" element={<AdminCrowdfundings />} />
              <Route path="/campaign/:name/settings" element={<AdminSettingsTab />}>
                <Route path="/campaign/:name/settings/profile" element={<ProfileSettings />} />
                <Route path="/campaign/:name/settings/payments" element={<Payments />} />
                <Route path="/campaign/:name/settings/payments/:accountId" element={<Payments />} />
                <Route path="/campaign/:name/settings/administrators" element={<AdminAdmin />} />
                <Route path="/campaign/:name/settings/billing" element={<AdminBilling />} />
                {/* <Route path="/campaign/:name/settings/controls" element={<AdminControl />} />*/}
              </Route>
              <Route path="*" element={<Payments />} />
            </Route>
          </Routes>
          {/*
        </React.Suspense>
        */}
        </>
      )}

      {CampaignAdminAuthToken && !location.pathname.startsWith('/campaign') && (
        <Routes>
          <Route path="/" element={<FrontEndLayOut />}>
            <Route path="/" element={<HomeController />} />
            <Route path="/categories/:slug" element={<CategoryProductsController />} />
            <Route path="/xp" element={<Xp />} />
            <Route exact path="/change-password" element={<ChangePassword />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/pricing" element={<Pricing />} />

            <Route path="/help" element={<Help />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/fundraisers" element={<Fundraisers />} />
            <Route path="/plans" element={<PlansController />} />
            <Route path="/help-category" element={<HelpCategory />} />
            <Route path="/help-article" element={<HelpArticle />} />
            <Route path="/help-contact" element={<HelpContact />} />
            <Route path="/item-tags" element={<ItemTags />} />
            <Route path="/media" element={<Media />} />
            <Route path="/ranks" element={<Ranks />} />
            <Route path="/about" element={<AboutController />} />
            <Route exact path="/organization/:name" element={<OrganizationDetailsController />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* <Route exact path="/change-password" element={<ChangePassword />} /> */}
            <Route exact path="/item/:name" element={<ItemDetailsController />} />
            <Route exact path="/project/:name" element={<ProjectDetailsController />} />
            <Route exact path="/crowdfunding/:name" element={<CrowdfundingDetailsController />} />
            {/* <Route path="/cart" element={<CartController />} />
                        <Route path="/checkout" element={<CheckoutController />} />
                        <Route path="/thankyou" element={<ThankYou />} /> */}
            <Route path="*" element={<HomeController />} />
          </Route>
        </Routes>
      )}

      {/*
        no admin, no user, no campaign token. 
        If admin path, else if NOT campaign path
      */}

      {!adminAuthToken &&
        !userAuthToken &&
        !CampaignAdminAuthToken &&
        (location.pathname.startsWith('/admin') ? (
          <ThemeConfig>
            <ScrollToTop />
            <GlobalStyles />
            <BaseOptionChartStyle />
            <LogoOnlyLayout />
          </ThemeConfig>
        ) : (
          !location.pathname.startsWith('/campaign') && (
            <>
              <Routes>
                <Route path="/" element={<HomeController />} />
                <Route path="/categories/:slug" element={<CategoryProductsController />} />
                <Route
                  exact
                  path="/organization/:name"
                  element={<OrganizationDetailsController />}
                />
                <Route exact path="/item/:name" element={<ItemDetailsController />} />
                <Route exact path="/project/:name" element={<ProjectDetailsController />} />
                <Route exact path="/crowdfunding/:name" element={<CrowdfundingDetailsController />} />
                <Route exact path="/signin" element={<SigninController />} />
                <Route exact path="/signup" element={<SignupController />} />
                <Route exact path="/forgot-password" element={<ForgotPasswordController />} />
                <Route exact path="/otp/:email" element={<ResetPasswordController />} />
                <Route exact path="/apply" element={<ApplyOrganizationController />} />
                <Route exact path="/activate" element={<ActivationController />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/partnership" element={<Partnership />} />
                <Route path="/about" element={<AboutController />} />
                {/* <Route path="/verified" element={<VerifiedDonors />} /> */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/media" element={<Media />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/ranks" element={<Ranks />} />
                <Route path="/trust" element={<Trust />} />
                <Route path="/fundraisers" element={<Fundraisers />} />
                <Route path="/xp" element={<Xp />} />
                <Route path="/help" element={<Help />} />
                <Route path="/help-category" element={<HelpCategory />} />
                <Route path="/help-article" element={<HelpArticle />} />
                <Route path="/help-contact" element={<HelpContact />} />
                {/* <Route path="/verified" element={<VerifiedDonors />} /> */}
                <Route path="/item-tags" element={<ItemTags />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route exact path="*" element={<SigninController />} />
              </Routes>
            </>
          )
        ))}


      {/*
        admin logged in
      */}
      {adminAuthToken && (
        <ThemeConfig>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <React.Suspense fallback={<LoadingPage />}>
            <AdminPrivateRoutes />
          </React.Suspense>
        </ThemeConfig>
      )}

      {/*
        user logged in; not viewing admin or campaign routes
      */}
      {userAuthToken &&
        !location.pathname.startsWith('/admin') &&
        !location.pathname.startsWith('/campaign') && (
          <Routes>
            <Route path="/" element={<FrontEndLayOut />}>
              <Route path="/" element={<HomeController />} />
              <Route path="/categories/:slug" element={<CategoryProductsController />} />
              <Route exact path="/apply" element={<ApplyOrganizationController />} />
              <Route exact path="/activate" element={<ActivationController />} />
              <Route path="/about" element={<AboutController />} />
              <Route path="/xp" element={<Xp />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/partnership" element={<Partnership />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/help" element={<Help />} />
              <Route path="/trust" element={<Trust />} />
              <Route path="/fundraisers" element={<Fundraisers />} />
              <Route path="/help-category" element={<HelpCategory />} />
              <Route path="/help-article" element={<HelpArticle />} />
              <Route path="/help-contact" element={<HelpContact />} />
              <Route path="/item-tags" element={<ItemTags />} />
              <Route path="/media" element={<Media />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/ranks" element={<Ranks />} />
              <Route exact path="/organization/:name" element={<OrganizationDetailsController />} />
              <Route exact path="/change-password" element={<ChangePassword />} />
              <Route exact path="/item/:name" element={<ItemDetailsController />} />
              <Route exact path="/project/:name" element={<ProjectDetailsController />} />
              <Route exact path="/crowdfunding/:name" element={<CrowdfundingDetailsController />} />
              <Route path="/cart" element={<CartController />} />
              <Route path="/checkout" element={<CheckoutController />} />
              <Route path="/thankyou" element={<ThankYou />} />
              <Route path="/order/:id" element={<OrderConfirmPage />} />
              <Route path="/donate/:id" element={<DonationConfirmPage />} />
              {/* <Route path="/verified" element={<VerifiedDonors />} /> */}
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="user" element={<UserDetail />}>
                <Route path="/user/:name/dashboard" element={<UserDashboard />} />
                <Route path="/user/:name/items" element={<UserItems />} />
                <Route path="/user/:name/xp" element={<UserXp />} />
                <Route path="/user/:name/tax" element={<UserTax />} />
                <Route path="/user/:name/history" element={<UserHistory />} />
                <Route path="/user/:name/settings" element={<UserSettingsTab />}>
                  <Route path="/user/:name/settings/profile" element={<UserProfile />} />
                  <Route path="/user/:name/settings/accounts" element={<UserAccounts />} />
                  <Route path="/user/:name/settings/billing" element={<UserBilling />} />
                  {/*<Route path="/user/:name/settings/controls" element={<UserControl />} />*/}
                  <Route path="/user/:name/settings/administrator" element={<UserAdmin />} />
                </Route>
              </Route>
              <Route path="*" element={<HomeController />} />
            </Route>
          </Routes>
        )}
    </div>
  );
}

const LoadingPage = () => {
  return (
    <div className="mt-5 d-flex justify-content-center">
      <CircularProgress />
    </div>
  );
};
