import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './index.scss';

export default props => {
  let { className, children } = props;

  let dividerClass = classnames(className, styles.divider);

  return (
    <div className={dividerClass}>
      {children}
    </div>
  );
}
