import React, { Component } from 'react';
// import classNames from 'classnames/bind';
// import './App.css';
// import styles from './App.module.css';
// import styles from './App.scss';
import Button from './components/Button';
import StyledButton from './components/StyledButton';

// const cx = classNames.bind(styles);
class App extends Component {
  render() {
    const isBlue = true;
    return (
      // <div className={cx('box', 'blue')}>
      // <div className={cx('box', {
      //   blue: isBlue
      // })}>
      //   <div className={cx('box-inside')} />
      // </div>
      <div>
        <Button>버튼</Button>
        <StyledButton big>스타일 버튼</StyledButton>
      </div>
    );
  }
}

export default App;
