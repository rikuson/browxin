import 'jquery';
import 'bootstrap';
import './App.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { themes, actions } from './lib/theme';
import CommandLine from './CommandLine';
import { TodoistWidget, TodoistWidgetNav } from './plugins/todoist';

class App extends Component {
  static get WIDGETS() {
    return [
      { nav: TodoistWidgetNav, content: TodoistWidget },
    ];
  }
  constructor() {
    super();
    this.state = {
      isSetting: false,
      hasThemeChanged: false,
    };
  }
  openSetting() {
    this.setState({ isSetting: true });
  }
  closeSetting() {
    this.setState({ isSetting: false });
  }
  changeTheme(e) {
    this.props.setTheme(e.target.value);
    this.setState({ hasThemeChanged: true });
  }
  render() {
    return (
      <div id="app">
        <div className="container">
          {this.state.hasThemeChanged ? <Alert /> : ''}
          {this.state.isSetting ? <Settings onChange={e => this.changeTheme(e)} theme={this.props.theme} onToggle={() => this.closeSetting()} /> : <Content onToggle={() => this.openSetting()} />}
        </div>
      </div>
    );
  }
}

function Alert() {
  return (
    <div className="alert alert-info" role="alert">
      Page needs to be reloaded.
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <hr />
      <div className="text-right">
        <a className="btn btn-primary" href="./">Reload now</a>
        <button type="button" className="btn btn-link" data-dismiss="alert" aria-label="Close">
          Later
        </button>
      </div>
    </div>
  );
}

function Content(props) {
  return (
    <div className="position-relative">
      <h1 className="display-3">Browxin</h1>
      <p className="lead">Browse in cross-platform!</p>
      <CommandLine />
      <ul className="nav nav-tabs" role="tablist">
        {App.WIDGETS.map((props, i) => <WidgetNav active={i === 0} key={i} id={`widget-${i}-tab`} href={'#widget-' + i} {...props} />)}
      </ul>
      <div className="tab-content jumbotron">
        {App.WIDGETS.map((props, i) => <Widget className={i === 0 ? 'active show' : ''} key={i} id={'widget-' + i} {...props} />)}
      </div>
      <button type="button" className="config" onClick={props.onToggle}>
        <i className="icon-equalizer" />
      </button>
    </div>
  );
}

function Settings(props) {
  return (
    <div className="position-relative pt-4">
      <h2 className="display-4">Settings</h2>
      <div className="form-group">
        <label htmlFor="config-theme">Theme</label>
        <select onChange={props.onChange} className="form-control" id="config-theme" value={props.theme} aria-describedby="theme-help-text">
          {themes.map((theme, i) => <option key={`theme-${i}`}>{theme}</option>)}
        </select>
        <small id="theme-help-text" className="form-text text-muted">
          It requires page reloading. You can see preview of themes from <a target="_blank" href="https://bootswatch.com" rel="noreferrer">bootswatch</a>.
        </small>
      </div>
      <button type="button" className="config" onClick={props.onToggle}>
        <span aria-label="Close">&times;</span>
      </button>
    </div>
  );
}

function Widget(props) {
  const Content = props.content;
  return (
    <div className={`tab-pane fade ${props.className}`} id={props.id} role="tabpanel" aria-labelledby={`${props.id}-tab`}><Content /></div>
  );
}

function WidgetNav(props) {
  const Nav = props.nav;
  return (
    <li className="nav-item dropdown" role="presentation"><Nav id={props.id} href={props.href} active={props.active} /></li>
  );
}

export default App = connect(
  state => ({
    theme: state.theme.theme,
  }),
  dispatch => ({
    setTheme: theme => dispatch(actions.setTheme(theme)),
    loadTheme: theme => dispatch(actions.loadTheme(theme)),
  })
)(App);
