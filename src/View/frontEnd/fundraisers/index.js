import './style.scss';
import { Button, ProgressBar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import Avatar from '../Component/atoms/avatar';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import helper from '../../../Common/Helper';
import { Link } from 'react-router-dom';
import profile from '../../../assets/images/avatar.png';
import crowdfundingApi from '../../../Api/admin/crowdfunding';
import { useState, useEffect } from 'react';

import DefaultLayout from '../Component/templates/default-layout';

const Fundraisers = (props) => {
  const [crowdfundingList, setCrowdfundingList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch the crowdfunding list when component mounts
  useEffect(() => {
    getCrowdfundingList(1); // Assuming the first page is loaded initially
  }, []);

  const getCrowdfundingList = async (page) => {
    try {
      let formData = {
        organizationId: props.organizationId, // Make sure this is available in props
        pageNo: page,
        sortField: 'created_at',
        sortType: 'desc',
        filter: true,
        type: 'crowdfunding'
      };

      const response = await crowdfundingApi.listByOrganization(props.token, formData);

      if (response.data.success) {
        setCrowdfundingList(response.data.data);
        setTotalPages(response.data.totalPages); // For pagination if required
      }
    } catch (error) {
      console.error('Error fetching crowdfunding list: ', error);
    }
  };

  return (
    <DefaultLayout>
      <Container fluid className="position-relative pb-5 pt-3">
        <div className="projects__table list__table mb-2 mb-sm-0">
          <ul className="list-unstyled mb-0 list__table-list">
            {crowdfundingList.length > 0 ? (
              crowdfundingList.map((crowdfunding, key) => (
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
        </div>
      </div>
    </li>
  );
};

export default Fundraisers;
