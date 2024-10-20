import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../redux/psychologists/psychoReducer';
import {
  Arrow,
  FilterContainer,
  FilterTitle,
  Label,
  LabelArea,
  OptionItem,
  OptionsList,
} from './Filter.styled';

const Filter = ({ isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const sortBy = useSelector(state => state.psychologists.sortBy);
  const IMAGE_BASE_URL = process.env.PUBLIC_URL + '/images';

  const filterOptions = [
    { label: 'Всі', value: 'all' },
    { label: "Ім'я А-Я", value: 'name_asc' },
    { label: "Ім'я Я-А", value: 'name_desc' },
    { label: 'Ціна від високої до низької', value: 'price_high_low' },
    { label: 'Ціна від низької до високої', value: 'price_low_high' },
    { label: 'Популярні', value: 'popular' },
    { label: 'Непопулярні', value: 'not_popular' },
  ];

  const filterRef = useRef(null);

  const handleSortChange = value => {
    dispatch(setSortBy(value));
    onToggle();
  };

  const handleClickOutside = event => {
    if (
      filterOptions.current &&
      !filterOptions.current.contains(event.target)
    ) {
      onToggle();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <FilterContainer ref={filterRef}>
      <FilterTitle>Фільтр</FilterTitle>
      <LabelArea onClick={onToggle}>
        <Label>
          {filterOptions.find(option => option.value === sortBy).label}
        </Label>
        <Arrow
          src={`${IMAGE_BASE_URL}/svg/filterArrow.svg`}
          width="20"
          height="20"
          alt="стрілка"
        />
      </LabelArea>
      {isOpen && (
        <OptionsList>
          {filterOptions.map((option, index) => (
            <OptionItem
              key={index}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </FilterContainer>
  );
};

export default Filter;
