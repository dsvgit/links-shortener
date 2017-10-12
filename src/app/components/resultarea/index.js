import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './index.scss';
import appStyles from '../index.scss';

export default props => {
  let { className, html } = props;

  let resultAreaClass = classnames(
    appStyles.area,
    styles.resultarea,
    className
  );

  return (
    <div className={resultAreaClass} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
