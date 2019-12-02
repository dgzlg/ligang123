import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Header/index';
import {SIDER_MENU_WIDTH} from '../uiConfig';
import { copyRight } from '../../../../config/info';

const MainContent = ({ children, winWidth }) => {
    return (
        <div
            style={{width: winWidth - SIDER_MENU_WIDTH, left: SIDER_MENU_WIDTH}}
            id="mainContent"
        >
            <Header/>
            <div className="scroll-box">
                <div id="app-content">
                    {children}
                </div>
                <div id="app-footer">{copyRight}</div>
            </div>
        </div>
    );
};

MainContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    winWidth: PropTypes.number,
    winHeight: PropTypes.number,
    dispatch: PropTypes.func
};

const mapStateToProps = ({ Main: { winWidth, winHeight } }) => ({ winWidth, winHeight });

export default connect(mapStateToProps)(MainContent);
