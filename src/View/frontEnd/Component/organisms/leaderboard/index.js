import DefaultLayout from '../../templates/default-layout';
import './style.scss';
import { Col, Row, Container } from 'react-bootstrap';
import Avatar from '../../atoms/avatar';
import helper, { getCalculatedPrice } from '../../../../../Common/Helper';
import { useSelector } from 'react-redux';
import userApi from '../../../../../Api/frontEnd/user';
import React, { useState, useEffect } from 'react';
import AvatarImg from '../../../../../assets/images/avatar.png';
import Page from '../../../../../components/Page';

const LeaderBoard = () => {
  const getC = getCalculatedPrice();
  const user = useSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const getList = async () => {
    let data = {};
    data.countryId = user.countryId;
    const list = await userApi.getUserHighXpList(userAuthToken, data);
    if (list && list.data.success) {
      setList(list.data.data);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (user.countryId) {
        await getList();
      }
      setLoading(false);
    })();
  }, [user.countryId]);

  return (
    <>
      <Page
        title="Donorport | Leaderboard"
        description="See where you rank among the top Donors. All Time.. All Time; Locally; Recent. 1. Karl Martin.. 1005 XP.. Captain. 2. Dusty Selkirk.. 855 XP."
      >
        {/*<FrontLoader loading={loading} />*/}
        <DefaultLayout>
          <Container luid className="position-relative pb-5 pt-5">
            <h1 className="fs-2 text-dark fw-bolder" style={{ marginTop: '50px' }}>
              Leaderboard
            </h1>
            <div className="fs-5 text-light" style={{ marginBottom: '56px' }}>
              See where you rank among the top donors in{' '}
              {user.countryName ? user.countryName : userData ? userData.country : ''}
            </div>

            <Row className="ml-5 mr-5">
              <Col lg="6" className="order-2 order-lg-0 mt-5 mt-lg-0">
                <ul className="p-0">
                  {list.length > 0 &&
                    list.map((person, i) => {
                      if (person.xp > 0) {
                        return (
                          <li className="similar__item__wrap  d-flex align-items-center">
                            <div
                              className="d-flex align-items-center w-100 border-bottom"
                              style={{ height: '90px' }}
                            >
                              <div className="">
                                <div className="fs-5 fw-bold mb-3p me-2 me-sm-5">{i + 1}</div>
                              </div>
                              <div className="d-flex align-items-center w-100">
                                <Avatar
                                  size={46}
                                  avatarUrl={
                                    person.image ? helper.DonorImagePath + person.image : AvatarImg
                                  }
                                  border={0}
                                  shadow={false}
                                />
                                <div className="ms-2 flex-grow-1">
                                  <div className="ladder__name d-flex align-items-center justify-content-start me-0 me-md-3">
                                    <div className="text-dark fw-bold">{person.name}</div>

                                    {/*<span className="text-info fs-5" style={{ marginLeft: "10px" }}>
                                                                        <FontAwesomeIcon icon={solid("badge-check")} />
                                            </span>*/}

                                    <span className="btn-sm">{/* Rank */}</span>
                                  </div>
                                  {/* <div className="text-lighter fs-8">
        
        
        
                                                    </div> */}
                                </div>

                                <div className="billing__value">
                                  <div className="d-flex justify-content-end pe-0 pe-sm-4 s-5 fw-bold text-info mb-3p text-end">
                                    {Number(person.xp).toLocaleString('en-US', {
                                      maximumFractionDigits: 2
                                    })}{' '}
                                    XP
                                  </div>
                                </div>
                                <div
                                  className="d-flex justify-content-end"
                                  style={{ width: '110px' }}
                                >
                                  <span className="btn-sm ">
                                    {getC.getUserRank(Number(person.xp))}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      }
                    })}
                </ul>
              </Col>

              <Col lg="1"></Col>

              <Col lg="5">
                <div role="listitem" className="rank__item w-dyn-item">
                  {/* <div className="share-dialog share-dialog--leaderboard hidden">
                                    <div className="sh__box">
                                        <div className="sh__header">
                                            <a href="#" className="icon icon--close w-inline-block">
                                                <div></div>
                                            </a>
                                        </div>
                                        <div className="sh__header">
                                            <div>Share this post.<br /></div>
                                        </div>
                                        <div className="sh__list">
                                            <a data-animate="ripple" href="#" className="sh__type sh__type--twitter w-inline-block">
                                                <div></div>
                                            </a>
                                            <a data-animate="ripple" href="#" className="sh__type sh__type--facebook w-inline-block">
                                                <div></div>
                                            </a>
                                            <a data-animate="ripple" href="#" className="sh__type sh-type--email w-inline-block">
                                                <div></div>
                                            </a>
                                            <a data-animate="ripple" href="#" className="sh__type sh__type--linkedin w-inline-block">
                                                <div></div>
                                            </a>
                                        </div>
                                        <div className="sh__header share__header--sub">
                                            <div>Or copy link<br /></div>
                                        </div>
                                        <div className="sh__link">
                                            <a href="#" className="icon icon--secure w-inline-block">
                                                <div></div>
                                            </a>
                                            <div className="sh__url">https://codepen.io/ayoisaiah/peerberberbwerb<br /></div>
                                            <a data-animate="ripple" href="#" className="btn btn--link w-button">Copy Link</a>
                                        </div>
                                    </div>
                                </div> */}
                  <div className="rank__top d-flex align-items-center">
                    <a
                      style={{ backgroundImage: 'url(' + user.profileImage + ')' }}
                      href="/user/david"
                      className="rank__avatar w-inline-block"
                    ></a>
                    <div className="rank__header">
                      <h3 className="fw-bolder ms-2 mb-0">{userData.name}</h3>
                      <div className="ladder__xp d-flex align-items-center mt-1">
                        {/* <a style={{backgroundColor:"#a278fc"}} href="/ranks" className="btn btn--xpbadge w-inline-block">
                                                <div className="icon icon--badge">
                                                    <div></div>
                                                </div>
                                                <div className="text text--badge">Narwhal</div>
                                            </a> */}
                        {
                          // getC.getUserRank(user.xp) !== "" &&

                          <span className="btn-sm ">{getC.getUserRank(user.xp)}</span>
                        }
                        <div className="ladder__xp ladder__xp--user w-inline-block">
                          <div className="tag tag--xp tag--xp_nobg  ms-3 fs-5 text-info">
                            {Number(user.xp).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                            &nbsp;XP
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="rank__bottom">
                                    <div className="rank__stats">
                                        <div className="rank__list rank__list--leaderboard">
                                            <div className="rank__user">
                                                <div className="studio__label _3">
                                                    <div>LOCALLY</div>
                                                </div>
                                                <div className="rank__tab rank__tab--ladder">
                                                    <div id="tab_wish">31</div>
                                                    <div className="rank__change">
                                                        <div>+ 7</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rank__user">
                                                <div className="studio__label _3">
                                                    <div>RECENT</div>
                                                </div>
                                                <div className="rank__tab rank__tab--ladder">
                                                    <div id="tab_wish">9</div>
                                                    <div className="rank__change">
                                                        <div>+ 19</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rank__user">
                                                <div className="studio__label _3">
                                                    <div>GLOBAL</div>
                                                </div>
                                                <div className="rank__tab rank__tab--ladder">
                                                    <div id="tab_wish">240</div>
                                                    <div className="rank__change">
                                                        <div>+ 3</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" className="icon icon--social w-inline-block">
                                            <div></div>
                                        </a>
                                    </div>
                                </div> */}
                </div>
              </Col>
            </Row>
          </Container>
        </DefaultLayout>
      </Page>
    </>
  );
};
export default LeaderBoard;
