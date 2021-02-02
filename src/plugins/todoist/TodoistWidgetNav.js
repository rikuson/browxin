import { Component } from 'react';
import { connect } from 'react-redux';
import { Rest } from '../../lib/TodoistApi';
import {
  setToken,
  removeToken,
  setProjects,
  openProject,
} from './todoistSlice';

class TodoistWidgetNav extends Component {
  componentDidMount() {
    if (this.props.token) {
      const api = new Rest(this.props.token);
      api.readProjects().then(projects => this.props.setProjects(projects)).catch(err => {
        console.error(err);
        this.props.removeToken();
      });
    }
  }
  render() {
    const dropdownAttr = {
      href: '#',
      role: 'button',
      className: 'nav-link dropdown-toggle active',
      'aria-haspopup': 'true',
      'aria-expanded': 'false',
      'data-toggle': 'dropdown',
    };
    const buttonAttr = {
      href: `#${this.props.id}`,
      role: 'tab',
      className: 'nav-link',
      'aria-controls': this.props.id,
      'data-toggle': 'tab',
      'aria-selected': 'true',
    };
    return (
      <>
        <a {...(this.props.active ? dropdownAttr : buttonAttr)} ><i className="icon-todoist" /> Todoist</a>
        <div className="dropdown-menu">
          {this.props.projects.map(project => <button key={project.id} className={'dropdown-item' + (project.active ? ' active' : '')} onClick={() => this.props.openProject(project.id)}>{project.name}</button>)}
        </div>
      </>
    );
  }
}

export default TodoistWidgetNav = connect(
  state => ({
    token: state.todoist.token,
    projects: state.todoist.projects,
  }),
  dispatch => ({
    setToken: token => dispatch(setToken(token)),
    removeToken: () => dispatch(removeToken()),
    setProjects: projects => dispatch(setProjects(projects)),
    openProject: projectId => dispatch(openProject(projectId)),
  })
)(TodoistWidgetNav);
