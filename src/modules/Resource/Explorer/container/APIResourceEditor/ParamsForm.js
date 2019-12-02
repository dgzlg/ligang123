import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Row, Col, Input, Select, Collapse, Button, Icon} from 'antd';

const FormItem = Form.Item;

const Option = Select.Option;

const Panel = Collapse.Panel;

const defaultParam = {
  name: '',
  in: 'query',
  required: false,
  testValueSource: 'static',
  from: '',
  testValue: '',
};

class ParamsForm extends Component {

  constructor(props) {
    super(props);
    this.addParam = this.addParam.bind(this);
    this.removeParam = this.removeParam.bind(this);
    this.handleFormValueChange = this.handleFormValueChange.bind(this);
    this.handleActivePanelChange = this.handleActivePanelChange.bind(this);
    this.state = {
      activePanelKeys: [],
    };
  }

  addParam() {
    const {params: prevParams} = this.props;
    const length = prevParams.length;
    this.props.updateParams([...prevParams, {...defaultParam}]);
    this.setState(prevState => ({
      activePanelKeys: [...prevState.activePanelKeys, length.toString()],
    }));
  }

  removeParam(index) {
    const params = [...this.props.params];
    params.splice(index, 1);
    this.props.updateParams(params);
  }

  handleFormValueChange(index, key, value) {
    const {params: prevParams} = this.props;
    const params = [...prevParams];
    let param;
    if (prevParams.length === 0) {
      param = {...defaultParam};
    } else {
      param = {...prevParams[index]};
    }
    params[index] = param;
    switch (key) {
      case 'required':
        param.required = value === 'true';
        break;
      case 'testValueSource':
        param.testValueSource = value;
        param.from = '';
        param.testValue = '';
        break;
      case 'testValue':
      case 'from':
        if (param.testValueSource === 'static') {
          param.testValue = value;
          param.from = '';
          break;
        }
        param.testValue = '';
        param.from = value;
        break;
      default:
        param[key] = value;
    }
    this.props.updateParams(params);
  }

  handleActivePanelChange(keys) {
    this.setState({activePanelKeys: keys});
  }

  render() {
    let {params} = this.props;

    const generateExtra = (index) => (
      <Icon type="delete" onClick={(e) => {e.stopPropagation();this.removeParam(index)}}/>
    );

    return ([
      <Row key="control" style={{marginBottom: 16}}>
        <Col>
          <Button htmlType="button" type="default" onClick={this.addParam}>新增参数</Button>
        </Col>
      </Row>,
      <Collapse key="list" bordered={true} activeKey={this.state.activePanelKeys} onChange={this.handleActivePanelChange}>
        {params.map(({name, in: type, required, testValueSource, from, testValue}, index) => (
          <Panel key={index} header={name || `param${index}`} extra={generateExtra(index)}>
            <Row gutter={12}>
              <Col span={24}>
                <FormItem label="名称" required={true}>
                  <Input value={name} onChange={(e) => this.handleFormValueChange(index, 'name', e.target.value)}/>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="类型">
                  <Select value={type} onChange={(value) => this.handleFormValueChange(index, 'in', value)}>
                    <Option value="query">QueryParam</Option>
                    <Option value="path">Path</Option>
                    <Option value="header">Header</Option>
                    <Option value="body">Body</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="&nbsp;">
                  <Select value={required ? 'true' : 'false'} onChange={(value) => this.handleFormValueChange(index, 'required', value)}>
                    <Option value="false">可选</Option>
                    <Option value="true">必填</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="测试值来源" required={required}>
                  <Select
                    value={testValueSource}
                    onChange={(value) => this.handleFormValueChange(index, 'testValueSource', value)}
                  >
                    <Option value="static">固定</Option>
                    <Option value="fromApi">来自接口</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="测试值" required={required}>
                  <Input
                    value={testValueSource === 'static' ? testValue : from}
                    onChange={(e) => this.handleFormValueChange(index, 'testValue', e.target.value)}
                  />
                </FormItem>
              </Col>
            </Row>
          </Panel>
        ))}
      </Collapse>
    ]);
  }
}

ParamsForm.propTypes = {
  params: PropTypes.array.isRequired,
  updateParams: PropTypes.func.isRequired,
};

export default ParamsForm;
