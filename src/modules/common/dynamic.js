import React from 'react';

/**
 * 动态加载组件
 * @param loader{function} 使用import语法加载module，返回Promise对象
 * @returns {{new(): DynamicComponent}}
 */
const dynamic = (loader) => {
    return class DynamicComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                AsyncComponent: null
            };
            loader().then((m) => {
                this.setState({
                    AsyncComponent: m.default || m
                });
            });
        }
        render() {
            const { AsyncComponent } = this.state;
            if (AsyncComponent) {
                return <AsyncComponent {...this.props}/>;
            }
            return '';
        }
    };
};

export {
    dynamic
};
