const getAdminAuthToken = () => {
  const adminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const getSuToken = localStorage.getItem('suToken') || '';

  return [adminAuthToken, getSuToken];
};

export default getAdminAuthToken;
