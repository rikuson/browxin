import './App.scss';
import { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import CommandLine from './CommandLine';
import { TodoistWidget } from './Widgets';

class App extends Component {
  static get WIDGETS() {
    return [
      { id: 'todoist', name: 'Todoist', icon: <i className="icon-todoist" />, widget: <TodoistWidget /> },
    ];
  }
  render() {
    return (
      <div id="app">
        <div className="container">
          <h1 className="display-3">Browxin</h1>
          <p className="lead"><ContentEditable html="Browse in cross-platform!" /></p>
          <CommandLine />
          <ul className="nav nav-tabs" role="tablist">
            {App.WIDGETS.map((props, i) => <WidgetNavItem className={i === 0 ? 'active' : ''} key={props.id} {...props} />)}
          </ul>
          <div className="tab-content">
            {App.WIDGETS.map((props, i) => <Widget className={i === 0 ? 'active show' : ''} key={props.id} {...props} />)}
          </div>
        </div>
      </div>
    );
  }
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
