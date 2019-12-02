import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class Index extends Component {
    constructor (props) {
        super(props);
        const value = props.value || {};
        this.state = {
            min: value.min,
            max: value.max
        };
        this.minInput = React.createRef();
        this.tasksAfterUpdate = [];
    }
    UNSAFE_componentWillReceiveProps (nextProps) {
        if ('value' in nextProps) {
            this.setState(nextProps.value);
        }
    }
    componentDidUpdate () {
        if (this.tasksAfterUpdate) {
            const taskNum = this.tasksAfterUpdate.length;
            if (taskNum < 1) return;
            for (let i = 0; i < taskNum; i++) {
                this.tasksAfterUpdate[i]();
            }
            this.tasksAfterUpdate = [];
        }
    }
    focus () {
        this.minInput.current.focus();
    }
    handleMinChange (e) {
        const value = e.target.value;
        this.setState({ min: value });
    }
    handleMinFinished (e, isPressEnter) {
        const { max } = this.state;
        let value = Number(e.target.value);
        if (isNaN(value)) {
            this.setState({ min: 0 });
            return;
        }
        if (value > max) value = max;
        if (!('value' in this.props)) {
            this.setState({ min: value });
        }
        this.triggerChange({ min: value }, isPressEnter);
    }
    handleMaxChange (e) {
        const value = e.target.value;
        this.setState({ max: value });
    }
    handleMaxFinished (e, isPressEnter) {
        const { min } = this.state;
        let value = Number(e.target.value);
        if (isNaN(value)) {
            this.setState({ max: 0 });
            return;
        }
        if (value < min) value = min;
        if (!('value' in this.props)) {
            this.setState({ max: value });
        }
        this.triggerChange({ max: value }, isPressEnter);
    }
    handleMinPressEnter (e) {
        this.handleMinFinished({ target: { value: e.target.value } }, true);
    }
    handleMaxPressEnter (e) {
        this.handleMaxFinished({ target: { value: e.target.value } }, true);
    }
    triggerChange (changedValue, isPressEnter) {
        const { onChange } = this.props;
        if (onChange) {
            onChange({ ...this.state, ...changedValue });
        }
        if (isPressEnter === true && this.props.onPressEnter) {
            this.tasksAfterUpdate.push(() => {
                this.props.onPressEnter();
            });
        }
    }
    render () {
        const { min, max } = this.state;
        let { placeholder } = this.props;
        placeholder = placeholder || ['min', 'max'];
        return (
            <span className={'range-input'}>
                <Input
                    ref={this.minInput}
                    style={{ textAlign: 'center' }}
                    className={'range-input-left'}
                    placeholder={placeholder[0]}
                    value={min}
                    onChange={this.handleMinChange.bind(this)}
                    onBlur={this.handleMinFinished.bind(this)}
                    onPressEnter={this.handleMinPressEnter.bind(this)}
                />
                <span className="range-input-middle">~</span>
                <Input
                    style={{ textAlign: 'center' }}
                    className={'range-input-right'}
                    placeholder={placeholder[1]}
                    value={max}
                    onChange={this.handleMaxChange.bind(this)}
                    onBlur={this.handleMaxFinished.bind(this)}
                    onPressEnter={this.handleMaxPressEnter.bind(this)}
                />
            </span>
        );
    }
}

Index.propTypes = {
    value: PropTypes.object,
    placeholder: PropTypes.array,
    onChange: PropTypes.func,
    onPressEnter: PropTypes.func
};

export default Index;
