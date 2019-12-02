import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import './FileSelector.less';

class FileSelector extends Component {

  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.fileInput = React.createRef();
  }

  selectFile() {
    this.fileInput.current.click();
  }

  handleFileChange(e) {
    if (!e.target.files[0]) {
      return;
    }
    if (this.props.handleFileChange) {
      this.props.handleFileChange(e.target.files[0]);
    }
  }

  render() {
    const {id, text} = this.props;
    return (
      <div className="file-selector">
        <input ref={this.fileInput} id={id} className="input" type="file" onChange={this.handleFileChange}/>
        <div className="select" onClick={this.selectFile}>{text}</div>
      </div>
    );
  }
}

FileSelector.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  handleFileChange: PropTypes.func,
};

export default FileSelector;