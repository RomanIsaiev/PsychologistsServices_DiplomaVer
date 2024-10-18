import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
} from '../../redux/psychologists/favoriteReducer';
import {
  AppoBtn,
  AvatarContainer,
  AvatarWrapper,
  CardTitle,
  Comment,
  Desc,
  DesktopPsychoContainer,
  ExpendedBtn,
  ExpertiseItem,
  ExpertiseList,
  FavoriteBtn,
  FlexRating,
  Item,
  ItemContainer,
  MobilePsychoContainer,
  Name,
  OnlineIcon,
  Price,
  PriceContainer,
  PsychoAvatar,
  RatingDecor,
  RatingPriceContainer,
  RatingTitle,
  ReviewAvatar,
  ReviewAvatarLetter,
  ReviewItem,
  ReviewUserContainer,
  ReviewUserName,
  ReviewUserRatingContainer,
  ReviewWrapper,
  StarIcon,
} from './PsychoItem.styled';
import { toast } from 'react-toastify';

export const PsychoItem = ({ psychologist, onAppointmentClick }) => {
  const {
    about,
    avatar_url,
    experience,
    initial_consultation,
    license,
    name,
    price_per_hour,
    rating,
    reviews,
    specialization,
  } = psychologist;

  const IMAGE_BASE_URL = process.env.PUBLIC_URL + '/images';
  const [expanded, setExpanded] = useState(false);
  const favorites = useSelector(state => state.favorites.items);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some(item => item.name === name)
  );

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    setIsFavorite(favorites.some(item => item.name === name));
  }, [favorites, name]);

  const handleReadMore = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      toast.warn('You need to log in or register to add favorites.');
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite(psychologist));
      setIsFavorite(false);
    } else {
      dispatch(addFavorite(psychologist));
      setIsFavorite(true);
    }
  };

  return (
    <Item>
      <ItemContainer>
        <AvatarContainer>
          <AvatarWrapper>
            <OnlineIcon
              src={`${IMAGE_BASE_URL}/svg/online.svg`}
              width="14"
              height="14"
              alt="онлайн"
            />
            <PsychoAvatar
              src={avatar_url}
              width="96"
              height="96"
              alt="фото психолога"
            />
          </AvatarWrapper>
          <MobilePsychoContainer>
            <CardTitle>Психолог</CardTitle>
            <Name>{name}</Name>
          </MobilePsychoContainer>
        </AvatarContainer>
        <div>
          <DesktopPsychoContainer>
            <CardTitle>Психолог</CardTitle>
            <Name>{name}</Name>
          </DesktopPsychoContainer>
          <ExpertiseList>
            <ExpertiseItem>
              Досвід: <span>{experience}</span>
            </ExpertiseItem>
            <ExpertiseItem>
              Ліцензія: <span>{license}</span>
            </ExpertiseItem>
            <ExpertiseItem>
              Спеціалізація: <span>{specialization}</span>
            </ExpertiseItem>
            <ExpertiseItem>
              Початкова консультація: <span>{initial_consultation}</span>
            </ExpertiseItem>
          </ExpertiseList>
          <Desc>{about}</Desc>
          <ExpendedBtn onClick={handleReadMore} type="button">
            {expanded ? 'Менше' : 'Детальніше'}
          </ExpendedBtn>
          {expanded && (
            <div>
              <ReviewWrapper>
                {reviews.map((review, reviewIndex) => (
                  <ReviewItem key={reviewIndex}>
                    <div>
                      <ReviewUserContainer>
                        <ReviewAvatar>
                          <ReviewAvatarLetter>
                            {review.reviewer.slice(0, 1)}
                          </ReviewAvatarLetter>
                        </ReviewAvatar>
                        <div>
                          <ReviewUserName>{review.reviewer}</ReviewUserName>
                          <ReviewUserRatingContainer>
                            <img
                              src={`${IMAGE_BASE_URL}/svg/star.svg`}
                              alt="зірка"
                              width="16"
                              height="16"
                            />
                            <span>{review.rating}</span>
                          </ReviewUserRatingContainer>
                        </div>
                      </ReviewUserContainer>
                      <Comment>{review.comment}</Comment>
                    </div>
                  </ReviewItem>
                ))}
              </ReviewWrapper>
              <AppoBtn
                type="button"
                onClick={() => onAppointmentClick(psychologist)}
              >
                Записатися на прийом
              </AppoBtn>
            </div>
          )}
        </div>
        <RatingPriceContainer>
          <FlexRating>
            <StarIcon
              src={`${IMAGE_BASE_URL}/svg/star.svg`}
              alt="зірка"
              width="16"
              height="16"
            />
            <RatingTitle>Рейтинг: {rating}</RatingTitle>
          </FlexRating>
          <RatingDecor>|</RatingDecor>
          <PriceContainer>
            <Price>
              Ціна / 1 година: <span>{price_per_hour}$</span>
            </Price>
          </PriceContainer>
          <div>
            <FavoriteBtn type="button" onClick={handleFavoriteClick}>
              {isFavorite ? (
                <img
                  src={`${IMAGE_BASE_URL}/svg/heart-fill.svg`}
                  alt="заповнене серце"
                  width="26"
                  height="26"
                />
              ) : (
                <img
                  src={`${IMAGE_BASE_URL}/svg/heart-empty.svg`}
                  alt="порожнє серце"
                  width="26"
                  height="26"
                />
              )}
            </FavoriteBtn>
          </div>
        </RatingPriceContainer>
      </ItemContainer>
    </Item>
  );
};
