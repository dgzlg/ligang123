import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ appName, logo, handleClick }) => {
    return (
        <div id="mainLogo" onClick={handleClick}>
            <img src={logo} alt="logo"/>
            <div className="name">{appName}</div>
        </div>
    );
};

Logo.propTypes = {
    appName: PropTypes.string,
    logo: PropTypes.string,
    handleClick: PropTypes.func
};

export default Logo;
