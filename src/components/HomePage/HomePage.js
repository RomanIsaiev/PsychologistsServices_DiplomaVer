import {
  ExpBlock,
  ExpContainer,
  ExpIcon,
  ExpIconBox,
  ExpInfoBox,
  ExpNumber,
  ExpText,
  HomeDesc,
  HomeFlex,
  HomeTitle,
  MainImage,
  PeopleIcon,
  PeopleIconBox,
  QuestionIcon,
  QuestionIconBox,
  SectionHome,
  StartButton,
} from './HomePage.styled';
const IMAGE_BASE_URL = process.env.PUBLIC_URL + '/images';

export const HomePage = () => {
  return (
    <SectionHome>
      <div className="container">
        <HomeFlex>
          <div>
            <HomeTitle>
              Дорога до <span>глибин</span> людської душі
            </HomeTitle>
            <HomeDesc>
              Ми допомагаємо розкрити ваш потенціал, подолати виклики та знайти
              свого провідника у власному житті за допомогою наших досвідчених
              психологів.
            </HomeDesc>
            <StartButton to="/psychologists">
              Почати
              <img
                src={`${IMAGE_BASE_URL}/svg/buton-arrow.svg`}
                alt="стрілка"
              />
            </StartButton>
          </div>
          <ExpContainer>
            <ExpBlock>
              <ExpIconBox>
                <ExpIcon
                  src={`${IMAGE_BASE_URL}/svg/check-mark-orange.svg`}
                  alt="позначка"
                  width="30"
                  height="30"
                />
              </ExpIconBox>
              <ExpInfoBox>
                <ExpText>Досвідчені психологи</ExpText>
                <ExpNumber>15,000</ExpNumber>
              </ExpInfoBox>
            </ExpBlock>
            <div>
              <PeopleIconBox>
                <PeopleIcon
                  src={`${IMAGE_BASE_URL}/svg/people.svg`}
                  alt="іконка людей"
                  width="20"
                  height="20"
                />
              </PeopleIconBox>
              <QuestionIconBox>
                <QuestionIcon
                  src={`${IMAGE_BASE_URL}/svg/question-sign.svg`}
                  alt="знак питання"
                  width="10"
                  height="17"
                />
              </QuestionIconBox>
              <picture>
                <source
                  srcSet={`${IMAGE_BASE_URL}/homepage/woman-desktop-1x.jpg 1x,
                ${IMAGE_BASE_URL}/homepage/woman-desktop-2x.jpg 2x`}
                  media="(min-width: 320px)"
                />
                <MainImage
                  src={`${IMAGE_BASE_URL}/homepage/woman-desktop-1x.jpg`}
                  alt="жінка"
                  width="464"
                  height="526"
                />
              </picture>
            </div>
          </ExpContainer>
        </HomeFlex>
      </div>
    </SectionHome>
  );
};
