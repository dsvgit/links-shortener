import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './index.scss';
import appStyles from '../index.scss';

export default props => {
  let { className, onChange } = props;

  let textAreaClass = classnames(
    appStyles.area,
    styles.textarea,
    className,
  );

  return (
    <textarea {...props}
              className={textAreaClass}
              onChange={e => onChange(e.target.value)} />
  );
}
