import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Steps} from 'antd';

const Step = Steps.Step;

class History extends Component {
  render() {
    const {style, list, mode, type} = this.props;
    return (
      <div style={style}>
        <Steps current={list.length} size="small">
          {list.map(({user, description, status}, index) => (
            <Step
              key={index}
              title={user}
              description={description}
              status={status}
            />
          ))}
        </Steps>
      </div>
    );
  }
}

History.propTypes = {
  style: PropTypes.object,
  list: PropTypes.array,
  mode: PropTypes.string,
  type: PropTypes.string,
};

export default History;