import React from 'react';
import styled from 'styled-components';
import { isIOS } from 'react-device-detect';
import SliderMain from '../components/SliderMain/SliderMain';
import Wrapper from '../components/Wrapper/Wrapper';
import Title from '../components/Title/Title';
import SliderHtml from '../components/SliderHtml/SliderHtml';
import GamesListSlider from '../components/GamesListSlider/GamesListSlider';
import Button from '../components/Button/Button';
import AndroidSection from '../components/AndroidSection/AndroidSection';
import useService from '../hooks/useService';

const Section = styled.div`
  overflow: hidden;
`;

const SectionHtml = styled(Section)`
  position: relative;
  z-index: 10;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
`;

const HomePage = () => {
  const { bestGameTagId, gameOfTheWeekTagId } = useService();

  return (
    <>
      {gameOfTheWeekTagId && <SliderMain tagId={gameOfTheWeekTagId} />}
      <SectionHtml>
        <Wrapper>
          <Title text="HTML games" />
        </Wrapper>
        {bestGameTagId && <SliderHtml tagId={bestGameTagId} />}
        <GamesListSlider />
        <Button text="Все игры" link="/online" darkTheme />
      </SectionHtml>
      {isIOS || <AndroidSection />}
    </>
  );
};

export default HomePage;
