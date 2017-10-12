import React, { Component } from 'react';
import _ from 'lodash';

import Textarea from './textarea';
import Resultarea from './resultarea';
import Divider from './divider';
import compileResult from '../helpers/compileResult';

import styles from './index.scss';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      html: ''
    };
  }

  compileResult() {
    const { text } = this.state;

    compileResult(text).then(html => {
      this.setState({ html });
    })
  }

  handleChangeText(text) {
    this.setState({ text }, this.compileResult);
  }

  render() {
    const {
      text,
      html
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.flex}>
          <Textarea className={styles.flex}
                    placeholder="Type your text here..."
                    onChange={v => this.handleChangeText(v)}
                    value={text} />
        </div>
        <Divider />
        <div className={styles.flex}>
          <Resultarea html={html} />
        </div>
      </div>
    );
  }
}
