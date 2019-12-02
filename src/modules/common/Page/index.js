import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import './index.less';

const PageProvider = (c) => {
  const Page = ({className, style, children}) => {
    return (
      <div className={classNames(c, className)} style={style}>
        {children}
      </div>
    );
  };
  Page.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  };
  return Page;
};

export const ContentPage = PageProvider('content-page');
export const TablePage = PageProvider('table-page');
export const BlockPage = PageProvider('block-page');
