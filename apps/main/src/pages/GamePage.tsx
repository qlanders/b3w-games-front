import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { ContentDetailFragment, useContentByIdQuery } from '../generated/graphql';
import Button from '../components/Button/Button';
import SliderGame from '../components/SliderGame/SliderGame';
import SliderHtml from '../components/SliderHtml/SliderHtml';
import breakpoints from '../helpers/breakpoints';
import getMetaParams from '../helpers/getMetaParams';
import useService from '../hooks/useService';
import ErrorPage from './ErrorPage';

const Wrapper = styled.div`
  color: #9afef0;
  font-weight: 300;
`;
const TitleImage = styled.img`
  display: block;
  height: auto;
  width: 100%;
`;
const title = css`
  position: relative;
  padding: 15px 10px;
  margin: 0;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 300;
  text-align: center;
  @media only screen and (${breakpoints.md}) {
    padding: 25px 10px;
    font-size: 30px;
  }
  @media only screen and (${breakpoints.lg}) {
    padding: 35px 10px;
    font-size: 40px;
  }
`;
const Title = styled.h1`
  ${title};
`;
const TitleH2 = styled.h2`
  ${title};
`;
const ButtomTitle = styled.p`
  ${title};
`;
const Hr = styled.hr`
  display: block;
  border-color: #9afef0;
  margin: 0;
`;
const Content = styled.div`
  padding: 20px 25px 25px;
  @media only screen and (${breakpoints.md}) {
    padding: 30px 40px 40px;
  }
`;
const Description = styled.div`
  margin: 0 0 15px;
  font-size: 20px;
  font-weight: 300;
  @media only screen and (${breakpoints.md}) {
    margin-bottom: 25px;
    font-size: 24px;
  }
  @media only screen and (${breakpoints.lg}) {
    margin-bottom: 35px;
    font-size: 30px;
  }
`;
const Text = styled.p`
  margin: 0;
  font-size: 16px;
  @media only screen and (${breakpoints.md}) {
    font-size: 20px;
  }
  @media only screen and (${breakpoints.lg}) {
    font-size: 24px;
  }
`;
const ButtonWrapper = styled.div`
    
`;

const GamePage = () => {
  const { params: { id } } = useRouteMatch<{ id: string }>();
  const { pathname } = useLocation();
  const { categoryHtmlId, bestGameTagId } = useService();
  const { data } = useContentByIdQuery({
    variables: {
      id: `content:${id}`,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const renderPage = ({
    previews, name, metaContentParams,
  }: ContentDetailFragment) => {
    const titleImg = previews?.find(({ type }) => type === 'title_800x200')?.link;
    const descriptionSh = getMetaParams(metaContentParams, 'short_description');
    const descriptionEsh = getMetaParams(metaContentParams, 'extra_short_description');
    const instructions = getMetaParams(metaContentParams, 'instructions');

    return (
      <>
        {titleImg && <TitleImage src={`/gate/f/${titleImg}`} alt="" />}
        <Title>{name}</Title>
        <Hr />
        <Content>
          <Description>{descriptionEsh}</Description>
          <Text>{descriptionSh}</Text>
        </Content>
        {previews && <SliderGame previews={previews} />}
        <ButtonWrapper>
          <Button text="играть" link="/" darkTheme />
        </ButtonWrapper>
        <Content>
          <TitleH2>Инструкция</TitleH2>
          <Text>{instructions}</Text>
        </Content>
        <Hr />
        <ButtomTitle>Больше игр</ButtomTitle>
        {categoryHtmlId && bestGameTagId && (
          <SliderHtml
            tagId={bestGameTagId}
            darkTheme
          />
        )}
      </>
    );
  };

  return (
    <Wrapper>
      {data?.point?.service.content ? renderPage(data.point.service.content) : <ErrorPage />}
    </Wrapper>
  );
};

export default GamePage;
