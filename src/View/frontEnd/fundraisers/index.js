import './style.scss';
import { Button, ProgressBar, Container } from 'react-bootstrap';
import Avatar from '../Component/atoms/avatar';
import helper from '../../../Common/Helper';
import { Link } from 'react-router-dom';
import profile from '../../../assets/images/avatar.png';
import crowdfundingApi from '../../../Api/admin/crowdfunding';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DefaultLayout from '../Component/templates/default-layout';

const Fundraisers = () => {
  const user = useSelector((state) => state.user);
  const [crowdfundingList, setCrowdfundingList] = useState([]);
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = userAuthToken || CampaignAdminAuthToken;

  const getAllCrowdfundingList = async () => {
    try {
      // Fetch the crowdfunding list with no token or data requirements
      const getCrowdfundingList = await crowdfundingApi.list(); // No token or data needed
      console.log({ getCrowdfundingList });
  
      // Check if the API call was successful and set the list
      if (getCrowdfundingList.data.success === true) {
        setCrowdfundingList(getCrowdfundingList.data.data);
      } else {
        console.error("Failed to fetch crowdfunding list");
      }
    } catch (error) {
      console.error("Error fetching crowdfunding list:", error);
    }
  };
  
  useEffect(() => {
    // Call the function when the component is mounted
    getAllCrowdfundingList();
  }, []);
  
  // Filter crowdfunding list to only include those with status 1
  const filteredCrowdfundingList = crowdfundingList.filter(
    (crowdfunding) => crowdfunding.status === 1
  );
  

  return (
    <DefaultLayout>
      <Container fluid className="position-relative pb-5 pt-3">
        <div className="mb-2 mb-sm-0">
          <ul className="fundraiser__grid">
            {filteredCrowdfundingList.length > 0 ? (
              filteredCrowdfundingList.map((crowdfunding, key) => (
                <CrowdfundingListItem key={key} crowdfunding={crowdfunding} />
              ))
            ) : (
              <li className="list__table-list p-2 mb-0">No entries to show</li>
            )}
          </ul>
        </div>
      </Container>
    </DefaultLayout>
  );
};

const CrowdfundingListItem = ({ crowdfunding }) => {
  // probably needs to take the list of donations, instead of products
  const countCrowdfundingProgress = (donations, goal) => {
    if (!goal || goal === 0) return 0; // If goal is 0 or undefined, return 0%

    const totalAmount = donations.reduce((acc, donation) => acc + donation.amount, 0);
    const progress = (totalAmount / goal) * 100;
    return Math.round(progress); // Return rounded progress percentage
  };

  return (
    <li className="d-flex flex-column align-items-center justify-content-center px-2 py-3">
      <Avatar
        size={62}
        border={0}
        shadow={false}
        avatarUrl={
          crowdfunding.imageDetails?.length > 0
            ? helper.CrowdfundingImagePath + crowdfunding.imageDetails[0].image
            : profile
        }
      />
      <div className="ms-2">
        <div className="fw-bolder fs-5 mb-3p">{crowdfunding.name}</div>
      </div>
      <div className="d-flex align-items-center flex-grow-1 mw-200">
        <ProgressBar
          variant="success"
          now={countCrowdfundingProgress(
            crowdfunding?.donationsHistory || [],
            crowdfunding?.goal || 0
          )}
          className="flex-grow-1"
        />
        <span className="ms-1 fw-semibold">
          {countCrowdfundingProgress(crowdfunding?.donationsHistory || [], crowdfunding?.goal || 0)}
          %
        </span>
      </div>
      <Link
        to={'/crowdfunding/' + crowdfunding.slug}
        className="cd__cart__name text-decoration-none"
      >
        Go to fundraiser
      </Link>
    </li>
  );
};

export default Fundraisers;
