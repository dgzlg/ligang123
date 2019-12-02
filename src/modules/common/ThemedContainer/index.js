import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.less';

const ThemedContainer = ({
  className, style, title,
  headerLeftText,
  headerRightText, headerRightCallback = () => {},
  footer,
  children,
}) => {
  return (
    <div
      className={classnames('themed-container', className)}
      style={style}
    >
      <header>
        <div className="title">{title}</div>
        <div className="left">{headerLeftText}</div>
        <div className="right" onClick={headerRightCallback}>{headerRightText}</div>
      </header>
      <main>
        {children}
      </main>
      {footer ?
        <footer>{footer()}</footer>
        : ''
      }
    </div>
  );
};

ThemedContainer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  headerLeftText: PropTypes.string,
  headerRightText: PropTypes.string,
  headerRightCallback: PropTypes.func,
  footer: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default ThemedContainer;
