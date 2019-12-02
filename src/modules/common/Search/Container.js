import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Input, Button } from 'antd';
import Index from '../RangeInput/index';

/**
 * 搜索
 * @param [enhancedSearch]{bool} 是否为增强搜索，默认false
 * @param [defaultSearchOptions]{array} 默认搜索项
 * @param [optionsIndex]{array} 搜索项索引(增强搜索时此项选参数）
 * @param onSearch{function} 搜索按钮点击时回调（function (condition) {}，condition为搜索条件）
 */
class Search extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchOptions: props.defaultSearchOptions,
            optionsChanged: false
        };
        this.tasksAfterUpdate = [];
    }
    componentDidUpdate () {
        /* 组件update后的任务操作队列 */
        if (this.tasksAfterUpdate) {
            const tasksNum = this.tasksAfterUpdate.length;
            if (tasksNum < 1) return;
            for (let i = 0; i < tasksNum; i++) {
                this.tasksAfterUpdate[i]();
            }
            this.tasksAfterUpdate = [];
        }
    }
    /* 重置搜索条件并刷新 */
    reset () {
        const { enhancedSearch } = this.props;
        if (enhancedSearch) {
            this.setState({ searchOptions: [], optionsChanged: true });
        } else {
            this.setState(({ searchOptions }) => {
                return { searchOptions: [{ ...searchOptions[0], value: '' }], optionsChanged: true };
            });
        }
        /* 重置完成状态更新后触发查询 */
        this.tasksAfterUpdate.push(() => {
            this.handleSearch();
        });
    }
    /* 添加筛选条件 */
    handleAddOption ({ key }) {
        if (key !== null) {
            const { optionsIndex } = this.props;
            const { searchOptions } = this.state;
            const option = optionsIndex[key];
            let lastIndex = searchOptions.length;
            this.setState(({ searchOptions }) => {
                const valueIndex = { keyword: '', range: { min: undefined, max: undefined } };
                searchOptions.push({ ...option, value: valueIndex[option.type] });
                return { searchOptions };
            });
            /* 将自动获取输入框焦点加入afterUpdate队列 */
            this.tasksAfterUpdate.push(() => {
                this[`${lastIndex}option`].focus();
            });
        }
    }
    /* 条件输入改变 */
    handleInputChange (payload, index) {
        this.setState(({ searchOptions }) => {
            searchOptions[index].value = payload;
            return { searchOptions, optionsChanged: true };
        });
    }
    handleSearch () {
        const { enhancedSearch, onSearch } = this.props;
        const { searchOptions, optionsChanged } = this.state;
        onSearch(searchOptions); //搜索条件为空时，点击搜索按钮刷新列表
        if (optionsChanged) {
            this.setState({ optionsChanged: false });
            if (!enhancedSearch) {
                onSearch([searchOptions[0]]);
            } else {
                onSearch(searchOptions);
            }
        }
    }
    render () {
        const { enhancedSearch, optionsIndex } = this.props;
        const { searchOptions } = this.state;
        const btnRest = <Button type="default" onClick={this.reset.bind(this)} icon="reload" htmlType={'button'}>重置</Button>;
        if (!enhancedSearch) {
            return [
                <div key={1} className="operation-item">
                    <Input.Search placeholder="关键词搜索" value={searchOptions[0].value} onChange={(e) => { this.handleInputChange(e.target.value, 0) }} onSearch={this.handleSearch.bind(this)}/>
                </div>,
                <div key={2} className="operation-item">
                    {btnRest}
                </div>
            ];
        }
        /* 当前已有的搜索条件 */
        const optionNodes = searchOptions.map(({ title, type, value }, index) => {
            switch (type) {
                case 'keyword':
                    return (
                        <div key={index} className="operation-item">
                            <span className="title">{title}:</span>
                            <Input
                                ref={(ele) => { this[`${index}option`] = ele }}
                                className={'input-single'}
                                value={value}
                                onChange={(e) => { this.handleInputChange(e.target.value, index) }}
                                onPressEnter={this.handleSearch.bind(this)}
                            />
                        </div>
                    );
                case 'range':
                    return (
                        <div key={index} className="operation-item">
                            <span className="title">{title}:</span>
                            <Index
                                ref={(ele) => { this[`${index}option`] = ele }}
                                value={value}
                                placeholder={['最小', '最大']}
                                onChange={(value) => { this.handleInputChange(value, index, type) }}
                                onPressEnter={this.handleSearch.bind(this)}
                            />
                        </div>
                    );
                default:
                    return '';
            }
        });
        /* 待选条件列表 */
        const optionsList = (
            <Menu onClick={this.handleAddOption.bind(this)}>
                {optionsIndex.map((option, index) => (
                    <Menu.Item key={index}>
                        <span>{option.title}</span>
                    </Menu.Item>
                ))}
            </Menu>
        );
        optionNodes.push(
            <div key={'reset'} className="operation-item">
                <Button.Group>
                    {btnRest}
                    <Dropdown overlay={optionsList} placement={'bottomCenter'}>
                        <Button type={'default'} icon={'filter'} htmlType={'button'}>筛选</Button>
                    </Dropdown>
                    <Button type={'default'} onClick={this.handleSearch.bind(this)} icon={'search'} htmlType={'button'}>搜索</Button>
                </Button.Group>
            </div>
        );
        return optionNodes;
    }
}

Search.propTypes = {
    enhancedSearch: PropTypes.bool,
    optionsIndex: PropTypes.array,
    defaultSearchOptions: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default Search;
