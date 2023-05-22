//import FrontLoader from "../../Common/FrontLoader";
import React, { useState, useEffect } from 'react';
import About from '../../View/frontEnd/about';
import adminCampaignApi from '../../Api/admin/adminCampaign';

export default function AboutController() {
  const [loading, setLoading] = useState(false);
  const [campaignAdminList, setCampaignAdminList] = useState([]);
  const userAuthToken = localStorage.getItem('userAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const getCampaignAdminList = await adminCampaignApi.list(
        userAuthToken ? userAuthToken : CampaignAdminAuthToken
      );
      if (getCampaignAdminList.data.success) {
        setCampaignAdminList(getCampaignAdminList.data.data);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <About campaignAdminList={campaignAdminList} />
    </>
  );
}
