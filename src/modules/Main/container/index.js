import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from './Login';
import Loading from './Loading';
import Sider from './Sider';
import MainContent from './MainContent';
import SyncUploadTasksViewer from '../../common/FileUpload/container/SyncUploadTasksViewer';
import MyMessage from '../../MyMessage/container/index';
import Home from '../../Home/container/index';
import ErrorPage from './Error/index';
import examples from '../../example';
import {dynamic} from '../../common/dynamic';
import moduleIndex from '../../module.index';
import bufferProvider from '../../common/utils/bufferProvider';
import {getUserMenus, prefix, winResize} from '../action';
import './index.less';

class Main extends Component {

  constructor(props) {
    super(props);
    this.createResponsiveView = this.createResponsiveView.bind(this);
    this.initializeUserData = this.initializeUserData.bind(this);
  }

  componentDidMount() {
    this.createResponsiveView();
    this.initializeUserData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.viewSizeBuffer, true);
  }

  initializeUserData() {
    const {dispatch} = this.props;
    dispatch(getUserMenus());
  }

  createResponsiveView() {
    const {dispatch} = this.props;
    const updateViewSize = () => {
      dispatch(winResize(document.documentElement.clientWidth, document.documentElement.clientHeight));
    };
    const buffer = bufferProvider(updateViewSize, 300);
    this.viewSizeBuffer = buffer;
    window.addEventListener('resize', buffer, true);
  }

  render() {
    const {userId, menus} = this.props;
    return (
      <div id="app-main">
        <Route exact path="/login" component={Login}/>
        <Loading/>
        <Sider/>
        <MainContent>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            {examples.map(({path, component}, index) => (
              <Route
                key={index}
                exact
                path={path}
                component={component}
              />
            ))}
            {menus.filter(_ => moduleIndex[_.rmodule])
              .map(({rmodule}, index) => (
                  <Route
                    key={index}
                    exact
                    path={`/${rmodule}`}
                    component={dynamic(moduleIndex[rmodule])}
                  />
                )
              )}
            <Route component={ErrorPage}/>
          </Switch>
        </MainContent>
        <SyncUploadTasksViewer/>
        {userId ? <MyMessage/> : ''}
      </div>
    );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func,
  userId: PropTypes.string,
  menus: PropTypes.array.isRequired,
};

const mapStateToProps = ({[prefix]: {userId, menus}}) => ({userId, menus});

export default connect(mapStateToProps)(Main);
