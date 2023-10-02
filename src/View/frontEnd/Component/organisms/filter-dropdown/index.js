// core
import React, { useRef, useState } from 'react';

// third party
import { Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
// import lottie from 'lottie-web/build/player/lottie_light';
import Lottie from 'lottie-web';
import Slider from 'rc-slider';

// app specific
import { IconToggle, CategoryCheckbox } from '../../atoms';

//import TooltipSlider from "../../molecules/tooltip-slider/index.tsx";

import sliderAnimationData from '../../../../../assets/lottie/slider.json';
import helper from '../../../../../Common/Helper';

// component style
import './style.scss';

const FilterDropdown = (props) => {
  const lottie = Lottie;
  const organizationList = props.organizationList;
  const categoryList = props.categoryList;
  const module = props.module;
  const categoryDetails = props.categoryDetails;
  const filters = props.prodctFilterData;

  // console.log(filters)

  const [hidden, setHidden] = useState(false);
  const [categories, setCategories] = useState([]);

  const sliderAnim = useRef(null);

  const onDropdownToggle = (state) => {
    const direction = state ? 1 : -1;
    sliderAnim.current.setDirection(direction);
    sliderAnim.current.play();
    // TODO: for transition we need to uncomment this line but it breaks filter lottie animation
    // need to fix that
    setHidden(state);
    if (state && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  React.useEffect(() => {
    sliderAnim.current = lottie.loadAnimation({
      container: document.querySelector('#filter__icon'),
      animationData: sliderAnimationData,
      loop: false,
      autoplay: false,
      renderer: 'svg'
    });
    sliderAnim.current.setSpeed(4);
  }, []);

  React.useEffect(() => {
    if (categoryList.length > 0) {
      let tempArray = [];
      categoryList.map((cat, i) => {
        let tempObj = {};
        tempObj.name = cat.name;
        tempObj.id = cat._id;
        tempObj.imgUrl = cat.icon;
        tempObj.categoryColor = cat.color;
        tempObj.checked = props.seletedCategoryList.includes(cat._id);
        tempObj.onSelectCategory = props.onSelectCategory;
        tempArray.push(tempObj);
      });
      setCategories(tempArray);
    }
  }, [categoryList, props.seletedCategoryList]);

  const marks = {
    [filters.lowestPrice]: filters.lowestPrice,
    [filters.highestPrice]: filters.highestPrice
  };

  return (
    <>
      {/* this enables back drop on mobile kind of buggy need to fix */}
      <div
        className={`selected__overlay ${!hidden ? 'hidden' : ''}`}
        onClick={() => setHidden(true)}
      ></div>

      <Dropdown className="d-flex w-100" onToggle={onDropdownToggle}>
        {module === 'HOME' ? (
          <Dropdown.Toggle
            variant="primary"
            className="toggle__btn toggle__btn--filters no-caret w-100"
            style={{ minWidth: '136px' }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <span className="fw-bold fs-5">Filters</span>
              <span
                id="filter__icon"
                className="lottie__icon ms-1 d-flex align-items-center fs-4"
                ref={sliderAnim}
              />
            </div>
          </Dropdown.Toggle>
        ) : (
          <Dropdown.Toggle
            variant="primary"
            className="toggle__btn toggle__btn--filters no-caret w-100"
            style={{ backgroundColor: categoryDetails?.color, borderColor: categoryDetails?.color }}
          >
            <div className="d-flex align-items-center justify-content-center">
              {/* <div className="avatar__small avatar__small--main"style={{width:"29px",height:"29px"}}>
                  <img src="" alt="" />
                  </div> */}
              <span className="fw-bold">{categoryDetails?.name}</span>
              <span
                id="filter__icon"
                className="lottie__icon ms-1 d-flex align-items-center fs-4"
                ref={sliderAnim}
              />
            </div>
          </Dropdown.Toggle>
        )}
        {/* <Dropdown.Toggle variant="primary" size="lg" className="no-caret rounded-pill w-100">
          <div className="d-flex align-items-center justify-content-center">
            
            <span className="fw-bold">Filters</span>
            <span
              id="filter__icon"
              className="lottie__icon ms-1 d-flex align-items-center fs-4"
              ref={sliderAnim}
            />
          </div>
        </Dropdown.Toggle> */}
        <Dropdown.Menu
          renderOnMount
          className="filter__dropdown mobile__dropdown dropdown-top-arrow"
        >
          <div className="filter__dropdown-hd border-bottom">
            <div className="filter__checkboxes d-flex align-items-center">
              <div className="filter__item d-flex justify-content-center text-center text-light flex__1">
                <div className="filter__label d-flex align-items-center fw-bold">Tax Eligible</div>
                <div className="filter__toggle fs-4">
                  <IconToggle
                    iconSize={24}
                    activeColor="#3a94d4"
                    icon={<FontAwesomeIcon icon={regular('calculator')} className="tax__icon" />}
                    checkedIcon={<FontAwesomeIcon icon={solid('paperclip')} />}
                    name="taxEligible"
                    onClickFilter={props.onClickFilter}
                    ischecked={props.filters?.taxEligible}
                  />
                </div>
              </div>

              <div className="filter__item d-flex justify-content-center text-center text-light flex__1">
                <div className="filter__label d-flex align-items-center fw-bold">Tab</div>
                <div className="filter__toggle fs-4">
                  <IconToggle
                    iconSize={24}
                    activeColor="#947ada"
                    icon={<FontAwesomeIcon icon={regular('tag')} />}
                    checkedIcon={<FontAwesomeIcon icon={solid('tag')} />}
                    name="postTag"
                    onClickFilter={props.onClickFilter}
                    ischecked={props.filters?.postTag}
                  />
                </div>
              </div>

              <div className="filter__item d-flex justify-content-center text-center text-light flex__1">
                <div className="filter__label d-flex align-items-center fw-bold">Ongoing</div>
                <div className="filter__toggle fs-4">
                  <IconToggle
                    iconSize={24}
                    activeColor="#947ada"
                    icon={<FontAwesomeIcon icon={regular('infinity')} />}
                    checkedIcon={<FontAwesomeIcon icon={solid('infinity')} />}
                    name="infinite"
                    onClickFilter={props.onClickFilter}
                    ischecked={props.filters?.infinite}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="filter__slider ">
            <Slider
              range
              min={filters.lowestPrice}
              max={filters.highestPrice}
              defaultValue={[filters.lowestPrice, filters.highestPrice]}
              marks={marks}
              onChange={(e) => props.onChangePriceSlider(e)}
            />
          </div>
          <div className="filter__dropdown-bd">
            <div className="category__list flex-wrap d-flex align-items-center">
              {categories.map((item, idx) => (
                <CategoryCheckbox
                  key={`category_${idx}`}
                  ind={`category_${idx}`}
                  id={item.id}
                  name={item.name}
                  imgUrl={item.imgUrl}
                  categoryColor={item.categoryColor}
                  checked={item.checked}
                  onSelectCategory={item.onSelectCategory}
                />
              ))}
            </div>
          </div>
          <div className="filter__footer p-2"></div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default FilterDropdown;
