import {connect} from 'react-redux';
import {Form} from 'antd';
import APIResourceEditor from './Editor';
import {
  cancelARE,
  nextAREditItem,
  prefix,
  prevAREditItem,
  saveAPIResource,
  testEditingAR,
  toAREditItem,
  updateAREValue
} from "../../action";

const mapStateToProps = ({
  [prefix]: {
    aRETarget, aREStep, aREItemIndex, aREName, aREDescription,
    aREIName, aREIUrl, aREIMethod, aREIResponseType, aREIPreInterface, aREIParams,
  }
}) => ({
  target: aRETarget, step: aREStep, itemIndex: aREItemIndex,
  resourceName: aREName, description: aREDescription,
  interfaceName: aREIName, url: aREIUrl, method: aREIMethod,
  responseType: aREIResponseType, preInterface: aREIPreInterface, params: aREIParams,
});

const mapDispatchToProps = (dispatch) => ({
  cancelEdit() {
    dispatch(cancelARE());
  },
  save() {
    dispatch(saveAPIResource());
  },
  nextStep() {
    dispatch(nextAREditItem());
  },
  prevStep() {
    dispatch(prevAREditItem());
  },
  stepTo(index) {
    dispatch(toAREditItem(index));
  },
  updateFormValue(values) {
    const payload = {};
    for (let key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        switch (key) {
          case 'resourceName':
            payload.aREName = values[key];
            break;
          case 'interfaceName':
            payload.aREIName = values[key];
            break;
          case 'url':
            payload.aREIUrl = values[key];
            break;
          case 'method':
            payload.aREIMethod = values[key];
            break;
          case 'responseType':
            payload.aREIResponseType = values[key];
            break;
          case 'params':
            payload.aREIParams = values[key];
            break;
          case 'description':
            payload.aREDescription = values[key];
            break;
          case 'preInterface':
            payload.aREIPreInterface = values[key];
            break;
          default:
        }
      }
    }
    dispatch(updateAREValue(payload));
  },
  test() {
    dispatch(testEditingAR());
  },
});

const formOptions = {
  mapPropsToFields(props) {
    return {
      resourceName: Form.createFormField({value: props.resourceName}),
      interfaceName: Form.createFormField({value: props.interfaceName}),
      url: Form.createFormField({value: props.url}),
      method: Form.createFormField({value: props.method}),
      responseType: Form.createFormField({value: props.responseType}),
      params: Form.createFormField({value: props.params}),
      description: Form.createFormField({value: props.description}),
      preInterface: Form.createFormField({value: props.preInterface}),
    };
  },
  onValuesChange(props, values) {
    props.updateFormValue(values);
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create(formOptions)(APIResourceEditor)
);
