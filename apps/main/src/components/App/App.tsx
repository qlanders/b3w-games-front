import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import SwiperCore, {
  Autoplay, Navigation, Pagination, Lazy, FreeMode, Controller,
} from 'swiper';
import 'swiper/swiper-bundle.css';
import Styles from '../Styles/Styles';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HomePage from '../../pages/HomePage';
import GamePage from '../../pages/GamePage';
import ListPage from '../../pages/ListPage';
import ConditionsPage from '../../pages/ConditionsPage';
import ErrorPage from '../../pages/ErrorPage';
import { useServiceQuery } from '../../generated/graphql';
import Loader from '../Loader/Loader';

SwiperCore.use([Autoplay, Navigation, Pagination, Lazy, FreeMode, Controller]);

const App = () => {
  const { loading } = useServiceQuery();

  if (loading) return <Loader />;

  return (
    <>
      <Normalize />
      <Styles />
      <Header />
      <Switch>
        <Route path="/user/conditions/" component={ConditionsPage} />
        <Route path="/game-page/:id" component={GamePage} />
        <Route path="/online" render={() => <ListPage page="online" />} />
        <Route path="/android" render={() => <ListPage page="android" />} />
        <Route path="/" exact component={HomePage} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
