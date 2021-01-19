import { Component } from 'react';
import { nanoid } from 'nanoid';
import { OAuth, Rest } from './lib/TodoistApi';
import { getQuery } from './lib/util';
import aes from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

class TodoistWidget extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      token: '',
    };
    if (window.localStorage.todoist_token) {
      this.state.token = window.localStorage.todoist_token;
    }
  }
  componentDidMount() {
    const query = getQuery();
    if ('state' in query && aes.decrypt(decodeURIComponent(query.state), window.localStorage.iv).toString(enc) === 'todoist') {
      window.localStorage.removeItem('iv');
      const api = new OAuth();
      api.fetchToken(query.code).then(token => {
        window.localStorage.setItem('todoist_token', token);
        window.location.href = '/';
      });
    } else if (this.state.token) {
      const api = new Rest(this.state.token);
      api.readTasks().then(tasks => this.setState({ tasks })).catch(err => {
        console.error(err);
        window.localStorage.removeItem('todoist_token');
        this.setState({ token: '' });
      });
    }
  }
  authorize() {
    const iv = nanoid();
    window.localStorage.setItem('iv', iv);
    const state = aes.encrypt('todoist', iv).toString();
    window.location.href = `https://todoist.com/oauth/authorize?client_id=${process.env.REACT_APP_TODOIST_CLIENT_ID}&scope=task:add,data:read_write&state=${state}`;
  }
  handleChange(e) {
    const id = e.target.value;
    const api = new Rest(this.state.token);
    api.completeTask(id);
    window.setTimeout(() => {
      this.setState({ tasks: this.state.tasks.filter(task => String(task.id) !== id) });
    }, 300);
  }
  render() {
    return (
      <div id="widget-todoist">
        {
          this.state.token ?
          <TaskList tasks={this.state.tasks} onChange={e => this.handleChange(e)} /> :
          <Config onClick={this.authorize} />
        }
      </div>
    );
  }
}

function TaskList(props) {
  return (
    <ul className="list-group list-group-flush">
      {props.tasks.sort((a, b) => a.created < b.created).map(task => (
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

export default TodoistWidget;
