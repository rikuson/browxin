import { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { getQuery, decryptAuthState, encryptAuthState } from '../../lib/util';
import {
  setIV,
  completeTask,
  readTasks,
  authorize,
} from './todoistSlice';

class TodoistWidget extends Component {
  componentDidMount() {
    const query = getQuery();
    if ('state' in query && decryptAuthState(query.state, this.props.iv) === 'todoist') {
      this.props.authorize(query).then(() => window.location.search = '');
    } else if (this.props.token) {
      this.props.readTasks();
    }
  }
  authorize() {
    const iv = nanoid();
    this.props.setIV(iv);
    const state = encryptAuthState('todoist', iv);
    window.location.href = `https://todoist.com/oauth/authorize?client_id=${process.env.REACT_APP_TODOIST_CLIENT_ID}&scope=task:add,data:read_write&state=${state}`;
  }
  handleChange(e) {
    this.props.completeTask(e.target.value);
  }
  render() {
    return (
      this.props.token ?
      <TaskList tasks={this.props.tasks} project={this.props.activeProject} onChange={e => this.handleChange(e)} /> :
      <Config onClick={() => this.authorize()} />
    );
  }
}

function TaskList(props) {
  return (
    <ul className="list-group list-group-flush">
      {props.tasks.filter(t => t.project_id === props.project).sort((a, b) => a.order < b.order ? 1 : -1).map(task => (
        <li key={task.id} className="list-group-item">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" onChange={e => props.onChange(e)} value={task.id} /> {task.content}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Config(props) {
  return <button className="btn btn-success m-2" onClick={e => props.onClick(e)}>Authorize</button>
}

export default TodoistWidget = connect(
  state => ({
    token: state.todoist.token,
    projects: state.todoist.projects,
    tasks: state.todoist.tasks,
    iv: state.todoist.iv,
    activeProject: state.todoist.activeProject,
  }),
  dispatch => ({
    setIV: iv => dispatch(setIV(iv)),
    completeTask: taskId => dispatch(completeTask(taskId)),
    readTasks: () => dispatch(readTasks()),
    authorize: query => dispatch(authorize(query)),
  })
)(TodoistWidget);
