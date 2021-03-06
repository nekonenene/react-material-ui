/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  fontFamily: '"Rounded Mplus 1c", "游ゴシック", YuGothic, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, "Helvetica Neue", Helvetica, Arial, "Roboto", "Droid Sans", sans-serif',
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary
        onTouchTap={ev => this.handleRequestClose(ev)}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Dialog
            open={this.state.open}
            title="Super Secret Password"
            actions={standardActions}
            onRequestClose={ev => this.handleRequestClose(ev)}
          >
            1-2-3-4-5です<br />大変だ！ 空から隕石が落ちてきたぞ！
          </Dialog>
          <h1>Material-UIだよ</h1>
          <h2>example project</h2>
          <RaisedButton
            label="Super Secret Password"
            secondary
            onTouchTap={ev => this.handleTouchTap(ev)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
