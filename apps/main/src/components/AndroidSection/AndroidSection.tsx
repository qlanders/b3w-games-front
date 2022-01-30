import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import breakpoints from '../../helpers/breakpoints';
import androidImg from '../../common/images/android.png';
import useService from '../../hooks/useService';
import androidSm from '../../common/images/android-sm.png';
import Wrapper from '../Wrapper/Wrapper';
import Title from '../Title/Title';
import SliderGotw from '../SliderGotw/SliderGotw';
import SliderAndroid from '../SliderAndroid/SliderAndroid';
import Button from '../Button/Button';
import { useContentsByTagLazyQuery } from '../../generated/graphql';

const WrapperAndroid = styled.div`
  padding-top: 50px;
  background: #65c04b url(${androidImg}) top 10px right -15px / 60% no-repeat;
  @media only screen and (${breakpoints.md}) {
    padding-top: 100px;
  }
`;

const HelperWrapper = styled.div`
  background: #65c04b url(${androidSm}) top 10px left / 40% no-repeat
`;

export interface IAndroidSection {
  className?: string;
}

const AndroidSection = ({
  className,
}: IAndroidSection) => {
  const { gameOfTheWeekTagId, getCategoryId } = useService();
  const categoryId = useMemo(() => getCategoryId('android'), []);

  const [getContentsByTag, { data }] = useContentsByTagLazyQuery();

  const game = data?.point?.service.tag?.contents?.[0];

  useEffect(() => {
    if (gameOfTheWeekTagId) {
      getContentsByTag({
        variables: {
          id: gameOfTheWeekTagId,
          categoryId,
        },
      });
    }
  }, [gameOfTheWeekTagId]);

  return (
    <WrapperAndroid className={className}>
      <Wrapper>
        <Title text="Android games" />
      </Wrapper>
      {game && <SliderGotw game={game} />}
      <HelperWrapper>
        {game && <Button text="Скачать" link={`/gate/${game.link}`} download={game.name} />}
        <SliderAndroid />
        <Button text="Все игры" link="/android" />
      </HelperWrapper>
    </WrapperAndroid>
  );
};

AndroidSection.defaultProps = {
  className: '',
};

export default AndroidSection;
