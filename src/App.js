// routes
import React, { createContext } from 'react';
import { ToastContainer } from 'react-toastify';
//import { userReducer } from './Reducer/userReducer';
//import useUser from './hooks/useUser';
// import './styles/scss/global.scss'
// import './styles/scss/global.scss'
import { store } from './store';
import { Provider } from 'react-redux';
//import Router from './routes';
// theme

//import ThemeConfig from './theme';
//import GlobalStyles from './theme/globalStyles';
// components
//import ScrollToTop from './components/ScrollToTop';
//import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
//import Abc from './pages/Abc';
import MainRoutes from './Routes/MainRoutes';
import './assets/css/style.scss';

export const UserContext = createContext({});

export default function App() {
  //const [user, userdispatch] = useReducer(userReducer, {
    //isLoggedIn: false,
    //isUpdateCart: false,
    //isUpdateOrg: false,
    //data: {},
    //transactionFee: 0,
    //platformFee: 0
  //});
  //const UserProviderContext = useUser(user, userdispatch);
  return (
    <>
      {/* <UserContext.Provider value={UserProviderContext}> */}
      <Provider store={store}>
        <ToastContainer />
        {/*<ScrollToTop />*/}
        <MainRoutes />
      </Provider>
      {/* </UserContext.Provider> */}
    </>
  );
}
