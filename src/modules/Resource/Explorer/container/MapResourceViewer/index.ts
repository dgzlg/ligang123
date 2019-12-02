import {PropsMapping, MapViewTarget} from '../../types/MapResourceViewer';
import {closeViewer} from "../../actions/MapResourceViewer";
import storeKey from '../../constants/storeKey';
import {Store} from 'redux';
import { connect } from 'react-redux';
import Viewer from './Viewer';

function mapStateToProps(store: Store) {
    let props: any = {};
    Object.keys(PropsMapping).forEach((key) => {
        props[key] = store[storeKey][PropsMapping[key]];
    });
    return props;
}

const mapDispatchToProps = {
    close: closeViewer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);