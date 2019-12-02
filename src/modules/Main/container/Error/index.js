import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './index.less';
import {FOOTER_HEIGHT, HEADER_HEIGHT} from "../uiConfig";

const mapStateToProps = ({'Main': {winHeight}}) => ({
  winHeight,
});

const ErrorPage = ({winHeight}) => {
  const height = winHeight - HEADER_HEIGHT - FOOTER_HEIGHT;
  return (
    <div className="page-error" style={{height, paddingTop: height / 2 - 80}}>
      <p>找不到页面</p>
    </div>
  );
};

ErrorPage.propTypes = {
  winHeight: PropTypes.number,
};

export default connect(mapStateToProps)(ErrorPage);