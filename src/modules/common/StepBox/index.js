import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';
const { Step } = Steps;
import './index.less';

/**
 * 步骤容器组件
 * 使用StepBox将内容包裹
 * @param children 对应需要被步骤容器管理的内容，一个子元素即为一个步骤内容
 * @param steps{array} 步骤条信息（步骤名和描述）
 * @param [currentStep]{number} 当前所处步骤，默认0
 * @param [status]{array} 当前各个步骤的状态，数组值的顺序与步骤顺序对应，值应为‘wait’,'process','finish','error'之一
 *        例如 ['finish', 'finish', 'error'] 表示第一、二步为完成状态，第三步错误状态
 * @param [width]{number} 步骤条的宽度，默认176px
 * @param [handleStepTo]{function} 用户点击步骤条时会触发此函数，函数的第一个参数即为所点的步骤值（从0开始）
 * @return {Object} React Node
 *
 * 使用格式:
 * <StepBox steps={[['第一步', '描述1'],['第二步', '描述2'],['第三步', '描述3‘], ...]}>
 *     <YourStep1/>
 *     <YourStep2/>
 *     <YourStep3/>
 *     ...
 * </StepBox>
 *
 * 若某个步骤包含了多个子元素，建议使用Step.Item进行包裹，而不是一个多余的DOM元素
 * <StepBox steps={[['第一步', '描述1'],['第二步', '描述2'],['第三步', '描述3‘]]}>
 *     <YourStep1/>
 *
 *     <Step.Item>
 *         <Element1OfStep2/>
 *         <Element2OfStep2/>
 *         <Element3OfStep2/>
 *         <ElementNOfStep2/>
 *     </Step.Item>
 *
 *     <YourStep3/>
 * </StepBox>
 */
const StepBox = ({ children, steps, currentStep = 0, status = [], width = 176, handleStepTo = () => {} }) => {
    if (children.length !== steps.length) {
        console.warn('步骤条数量与内容数量不一致！');
    }
    return (
        <div className="step-box">
            <div className="step-bars" style={{ width: width }}>
                <Steps direction="vertical" size="small" progressDot current={currentStep}>
                    {steps.map((step, index) => (
                        <Step key={index} title={step[0]} description={step[1]} status={status[index]} onClick={() => handleStepTo(index) } />
                    ))}
                </Steps>
            </div>
            <div className="view-box">
                <div className="step-items clear-fix" style={{ width: `${children.length * 100}%` }}>
                    {children.map((node, index) => (
                        <div key={index} className={`step-item${index === currentStep ? ' active' : ''}`}>
                            {node}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

StepBox.Item = ({ children }) => children;

StepBox.propTypes = {
    children: PropTypes.array.isRequired,
    width: PropTypes.number,
    steps: PropTypes.array.isRequired,
    currentStep: PropTypes.number,
    status: PropTypes.array,
    handleStepTo: PropTypes.func.isRequired
};

export default StepBox;