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

const Fundraisers = (props) => {
  const user = useSelector((state) => state.user);
  const [crowdfundingList, setCrowdfundingList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = userAuthToken || CampaignAdminAuthToken;

  const getAllCrowdfundingList = async () => {
    const data = {
      userCountry: user.countryId
    };
    const getCrowdfundingList = await crowdfundingApi.list(token, data);
    console.log({ getCrowdfundingList });
    if (getCrowdfundingList.data.success === true) {
      setCrowdfundingList(getCrowdfundingList.data.data);
    }
  };

  useEffect(() => {
    if (user.countryId) {
      getAllCrowdfundingList();
    }
  }, [user.countryId]);

  // Filter crowdfunding list to only include those with status 1
  const filteredCrowdfundingList = crowdfundingList.filter(
    (crowdfunding) => crowdfunding.status === 1
  );

  return (
    <DefaultLayout>
      <Container fluid className="position-relative pb-5 pt-3">
        <div className="projects__table list__table mb-2 mb-sm-0">
          <ul className="list-unstyled mb-0 list__table-list">
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
  return (
    <li className="table__list-item px-2 py-3">
      <div className="d-xl-flex align-items-center flex-grow-1">
        <div className="billing__main d-flex align-items-center me-sm-3 mb-2">
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
          <Link
            to={'/crowdfunding/' + crowdfunding.slug}
            className="cd__cart__name text-decoration-none"
          >
            Go to fundraiser
          </Link>
        </div>
      </div>
    </li>
  );
};

export default Fundraisers;
