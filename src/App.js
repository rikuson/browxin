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
      setting: false,
    };
  }
  toggleSetting() {
    this.setState({ setting: !this.state.setting });
  }
  changeTheme(e) {
    const theme = themes[e.target.value];
    window.localStorage.theme = theme;
    loadTheme();
  }
  render() {
    return (
      <div id="app">
        <div className="container">
          <button type="button" className="btn btn-lg btn-secondary float-right" onClick={() => this.toggleSetting()}><i className="icon-equalizer" /></button>
          {this.state.setting ? <Config onChange={e => this.changeTheme(e)} /> : <Content />}
        </div>
      </div>
    );
  }
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

function Config(props) {
  return (
    <div className="pt-5">
      <div className="form-group">
        <label for="config-theme">Theme</label>
        <select onChange={props.onChange} className="form-control" id="config-theme">
          {themes.map((theme, i) => <option value={i} selected={theme === (window.localStorage.theme || defaultTheme)}>{theme}</option>)}
        </select>
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
