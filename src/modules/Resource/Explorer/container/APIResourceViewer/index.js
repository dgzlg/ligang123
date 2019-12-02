import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import APIResourceViewer from './Viewer';
import {closeARV, editARFromViewer, testViewingAR, prefix} from "../../action";

const mapStateToProps = ({
  [prefix]: {
    aRVState, aRVTarget,
  },
}) => ({
  state: aRVState,
  resource: aRVTarget || {interface: {params: []}},
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    close: closeARV,
    edit: editARFromViewer,
    test: testViewingAR,
  }, dispatch);
};

const APIResourceViewerConnected = connect(mapStateToProps, mapDispatchToProps)(APIResourceViewer);

export default APIResourceViewerConnected;
