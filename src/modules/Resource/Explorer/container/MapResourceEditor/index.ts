import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import storeKey from '../../constants/storeKey';
import Editor from './Editor';
import {cancelMREdit, saveMR, viewMR, updateFormValue} from "../../actions/MapResourceEditor";
import {PropsMapping, MapVersions} from "../../types/MapResourceEditor";

function mapStateToProps(store) {
    let props: any = {};
    Object.keys(PropsMapping).forEach((key) => {
        props[key] = store[storeKey][PropsMapping[key]];
    });
    return props;
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            close: cancelMREdit,
            save: saveMR,
            view: viewMR,
        }, dispatch),
        updateFormValue(key: string, value: string | number) {
            let payload = {
                [PropsMapping[key]]: value,
            };
            // change version automatically when mapType changed
            if (key === 'mapType') {
                let versions = MapVersions[value];
                payload[PropsMapping['version']] = versions[versions.length - 1];
            }
            dispatch(updateFormValue(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
