import 'jquery';
import 'bootstrap';
import './App.scss';
import { Component } from 'react';
import { loadTheme, themes, defaultTheme } from './lib/theme';
import CommandLine from './CommandLine';
import { TodoistWidget } from './Widgets';

class App extends Component {
  static get WIDGETS() {
    return [
      { id: 'todoist', name: 'Todoist', icon: <i className="icon-todoist" />, widget: <TodoistWidget /> },
    ];
  }
  constructor() {
    super();
    this.state = {
      isSetting: false,
      hasThemeChanged: false,
      theme: window.localStorage.theme ? window.localStorage.theme : defaultTheme,
    };
  }
  toggleSetting() {
    this.setState({ isSetting: !this.state.isSetting });
  }
  changeTheme(e) {
    window.localStorage.theme = e.target.value;
    loadTheme();
    this.setState({ theme: e.target.value, hasThemeChanged: true });
  }
  render() {
    return (
      <div id="app">
        <div className="container">
          {this.state.hasThemeChanged ? <Alert /> : ''}
          <button type="button" className="config float-right" onClick={() => this.toggleSetting()}>
            {this.state.isSetting ? <span aria-label="Close">&times;</span> : <i className="icon-equalizer" />}
          </button>
          {this.state.isSetting ? <Settings onChange={e => this.changeTheme(e)} theme={this.state.theme} /> : <Content />}
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

function Content() {
  return (
    <>
      <h1 className="display-3">Browxin</h1>
      <p className="lead">Browse in cross-platform!</p>
      <CommandLine />
      <ul className="nav nav-tabs" role="tablist">
        {App.WIDGETS.map((props, i) => <WidgetNavItem className={i === 0 ? 'active' : ''} key={props.id} {...props} />)}
      </ul>
      <div className="tab-content jumbotron">
        {App.WIDGETS.map((props, i) => <Widget className={i === 0 ? 'active show' : ''} key={props.id} {...props} />)}
      </div>
    </>
  );
}

function Settings(props) {
  return (
    <div className="pt-5">
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
    </div>
  );
}

function Widget(props) {
  return (
    <div className={`tab-pane fade ${props.className}`} id={props.id} role="tabpanel" aria-labelledby={`${props.id}-tab`}>{props.widget}</div>
  );
}

function WidgetNavItem(props) {
  return (
    <li className="nav-item" role="presentation">
      <a className={`nav-link ${props.className}`} id={`${props.id}-tab`} data-toggle="tab" href={`#${props.id}`} role="tab" aria-controls={props.id} aria-selected="true">{props.icon} {props.name}</a>
    </li>
  );
}

export default App;
