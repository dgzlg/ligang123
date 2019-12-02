import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DirectoryTree from '../../../common/DirectoryTree';
import {HEADER_HEIGHT, FOOTER_HEIGHT} from "../../../Main/container/uiConfig";
import {prefix, updatePublicDirectory} from "../action";

const PublicDirectory = (
  {
    dispatch, winHeight, publicDirectoryLoading, publicDirectory,
  }
) => {
  return (
    <DirectoryTree
      style={{height: winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 32}}
      title="公共目录"
      tree={publicDirectory}
      loading={publicDirectoryLoading}
      initialCallback={() => dispatch(updatePublicDirectory())}
    />
  );
};

PublicDirectory.propTypes = {
  dispatch: PropTypes.func,
  publicDirectoryLoading: PropTypes.bool,
  publicDirectory: PropTypes.array.isRequired,
  winHeight: PropTypes.number,
};

const mapStateToProps = ({
  Main: {winHeight},
  [prefix]: {publicDirectoryLoading, publicDirectory},
}) => ({publicDirectoryLoading, publicDirectory, winHeight});

export default connect(mapStateToProps)(PublicDirectory);
