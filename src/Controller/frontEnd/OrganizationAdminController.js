import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import organizationApi from '../../Api/frontEnd/organization';
import AdminDetail from '../../View/frontEnd/admin-detail/index';
import productApi from '../../Api/frontEnd/product';

export default function OrganizationAdminController() {
  const [productList, setProductList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  // const adminAuthToken = localStorage.getItem('adminAuthToken');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [organizationDetails, setOrganizationDetails] = useState({});
  const adminData = JSON.parse(localStorage.getItem('CampaignAdmin'));
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  // localStorage.setItem('CampaignAdmin', JSON.stringify(login.data))

  useEffect(() => {
    (async () => {
      setLoading(true);
      // console.log(params.name)
      if (!(adminData && adminData.slug === params.name)) {
        let orgdata = {};
        const getOrganizationDetails = await organizationApi.details(params.name);
        if (getOrganizationDetails.data.success === true) {
          if (getOrganizationDetails.data.data.length) {
            orgdata = getOrganizationDetails.data.data[0];
            setOrganizationDetails(orgdata);
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
        setLoading(false);
      } else {
        navigate('/');
      }
    })();
  }, []);

  const getProductList = async (id) => {
    setLoading(true);

    const getOrganizationProducts = await productApi.listByOrganization(CampaignAdminAuthToken, id);
    if (getOrganizationProducts.data.success === true) {
      setProductList(getOrganizationProducts.data.data);
    }
    setLoading(false);
  };

  const getProjetList = async (id) => {
    setLoading(true);

    const getOrganizationProjets = await organizationApi.projectListByOrganization(
      CampaignAdminAuthToken,
      id
    );
    if (getOrganizationProjets.data.success === true) {
      setProjectList(getOrganizationProjets.data.data);
    }
    setLoading(false);
  };
  //

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <AdminDetail
        organizationDetails={organizationDetails}
        getProductList={getProductList}
        productList={productList}
        getProjetList={getProjetList}
        projectList={projectList}
      />
    </>
  );
}
