import { Component } from 'react';
import { connect } from 'react-redux';
import {
  openProject,
  readProjects,
} from './todoistSlice';

class TodoistWidgetNav extends Component {
  componentDidMount() {
    if (this.props.token) {
      this.props.readProjects();
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
      href: this.props.href,
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
          {this.props.projects.map(project => <button key={project.id} className={'dropdown-item' + (project.id === this.props.activeProject ? ' active' : '')} onClick={() => this.props.openProject(project.id)}>{project.name}</button>)}
        </div>
      </>
    );
  }
}

export default TodoistWidgetNav = connect(
  state => ({
    token: state.todoist.token,
    projects: state.todoist.projects,
    activeProject: state.todoist.activeProject,
  }),
  dispatch => ({
    openProject: projectId => dispatch(openProject(projectId)),
    readProjects: () => dispatch(readProjects()),
  })
)(TodoistWidgetNav);
