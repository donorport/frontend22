import { Container } from 'react-bootstrap';

import DefaultLayout from '../Component/templates/default-layout';
import Avatar from '../Component/atoms/avatar';
import React, { useEffect, useState } from 'react';
import ListItemImg from '../Component/atoms/list-item-img';
import settingApi from '../../../Api/admin/setting';
import { useSelector } from 'react-redux';
import helper, { getCalculatedPrice } from '../../../Common/Helper';
import Page from '../../../components/Page';
import { Link } from 'react-router-dom';
import crown from '../../../assets/images/crown.svg';
import list from '../../../assets/images/top.svg';
import money from '../../../assets/images/bank.svg';
import wallet from '../../../assets/images/wallet.svg';
import share from '../../../assets/images/share.svg';
import social from '../../../assets/images/speech-bubble.svg';

import './style.scss';

const Xp = () => {
  const userAuthToken = localStorage.getItem('userAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const user = useSelector((state) => state.user);
  const getC = getCalculatedPrice();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    topDonator: '',
    topDonation: '',
    forEachItem: '',
    forEachDonation: '',
    forEachShare: '',
    forEachOrganization: ''
  });
  const {
    topDonator,
    topDonation,
    forEachItem,
    forEachDonation,
    forEachShare,
    forEachOrganization
  } = state;

  useEffect(() => {
    (async () => {
      setLoading(true);

      const getSettingsValue = await settingApi.list(
        userAuthToken ? userAuthToken : CampaignAdminAuthToken,
        Object.keys(state)
      );
      if (getSettingsValue.data.data.length > 0) {
        let data = {};

        getSettingsValue.data.data.map((d, i) => {
          data[d.name] = d.value;
        });

        setState({
          ...data
        });
      }
      setLoading(false);
    })();
  }, []);

  const userData = JSON.parse(localStorage.getItem('userData'));
  let newSlug = userData?.name.split(/\s/).join('');

  return (
    <>
      <Page title="Donorport | XP" description="Learn how to build your XP to advance on the Donorport leaderboard">
  
        <DefaultLayout>
          <Container fluid className="pt-5">
            {userAuthToken && (
              <div className="d-flex align-items-center py-3 border-bottom">
                <Avatar
                  size={35}
                  avatarUrl={user.profileImage}
                  border={0}
                  shadow={false}
                  className="mr-12p"
                />

                <span className="fs-7 text-light me-2">Your Rank</span>

                {/* <IconButton
              bgColor="#a278fc"
              className="btn__xs rounded-pill ms-2"
              icon={<FontAwesomeIcon icon={solid("narwhal")} />}
            >
              Norwhal
            </IconButton> */}
                <span>{getC.getUserRank(user.xp)}</span>
                <a href="/" className="text-info fw-bold fs-5 ms-auto me-1">
                  {Number(user.xp).toLocaleString('en-US', { maximumFractionDigits: 2 })} XP
                </a>
              </div>
            )}
            <div className="py-20p">
              <div className="note mw-600">
                <div className="mb-12p">
                  Earn XP by interacting on Donorport even if you aren't donating money. Be rewarded
                  for sharing and following Organizations and Projects. To track the XP you've
                  earned, click here:
                </div>
                <Link to={'/user/' + newSlug + '/xp'} className=" fw-bolder">
                  My XP
                </Link>
              </div>
            </div>

            <div className="mw-800 pb-5 fs-5">
              <div className="d-flex align-items-center py-12p">
                <ListItemImg size={64} imgSrc={crown} />
                <span className="mx-sm-4 mx-2 flex__1 text-light">
                  A top donator + purchased items from every category, and all locations
                </span>
                <span className="fw-bold text-info">{topDonator} XP</span>
              </div>
              <div className="d-flex align-items-center py-12p">
                <ListItemImg size={64} imgSrc={list} />
                <span className="mx-sm-4 mx-2 flex__1 text-light">
                  Have the top donation to an organization over $500
                </span>
                <span className="fw-bold text-info">{topDonation} XP</span>
              </div>
              <div className="d-flex align-items-center py-12p">
                <ListItemImg size={64} imgSrc={money} />
                <span className="mx-sm-4 mx-2 flex__1 text-light">For each item you purchase</span>
                <span className="fw-bold text-info">{forEachItem} XP</span>
              </div>
              <div className="d-flex align-items-center py-12p">
                <ListItemImg size={64} imgSrc={wallet} />
                <span className="mx-sm-4 mx-2 flex__1 text-light">
                  For each donation to an Organization / Project
                </span>
                <span className="fw-bold text-info">{forEachDonation} XP</span>
              </div>
              <div className="d-flex align-items-center py-12p">
                <ListItemImg size={64} imgSrc={share} />
                <span className="mx-4 flex__1 text-light">
                  For each share of an item / Organization / Project via social media
                </span>
                <span className="fw-bold text-info">{forEachShare} XP</span>
              </div>
              <div className="d-flex align-items-center py-12p">
                <ListItemImg size={64} imgSrc={social} />
                <span className="mx-4 flex__1 text-light">
                  For each Organization / Project you follow
                </span>
                <span className="fw-bold text-info">{forEachOrganization} XP</span>
              </div>
            </div>
          </Container>
        </DefaultLayout>
      </Page>
    </>
  );
};

export default Xp;
