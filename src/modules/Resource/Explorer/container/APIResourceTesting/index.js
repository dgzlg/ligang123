import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {closeART, prefix} from "../../action";
import Testing from './Testing';

const mapStateToProps = ({
  [prefix]: {
    aRTState, aRTResult,
  },
}) => ({
  state: aRTState,
  result: aRTResult,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    close: closeART,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Testing);