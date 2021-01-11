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
      api.fetchToken(query.code).then(token => this.setState({ token }));
    } else if (this.state.token) {
      const api = new Rest(this.state.token);
      api.readTasks().then(tasks => this.setState({ tasks })).catch(err => {
        console.error(err);
        window.localStorage.removeItem('todoist_token');
        this.setState({ token: '' });
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.token && this.state.token) {
      const api = new Rest(this.state.token);
      window.localStorage.setItem('todoist_token', this.state.token);
      api.readTasks().then(tasks => this.setState({ tasks }));
    }
  }
  authorize() {
    const iv = nanoid();
    window.localStorage.setItem('iv', iv);
    const state = aes.encrypt('todoist', iv).toString();
    window.location.href = `https://todoist.com/oauth/authorize?client_id=${process.env.REACT_APP_TODOIST_CLIENT_ID}&scope=task:add,data:read_write&state=${state}`;
  }
  render() {
    return this.state.token ? <TaskList tasks={this.state.tasks} /> : <Config onClick={this.authorize} />;
  }
}

function TaskList(props) {
  return (
    <ul className="list-group list-group-flush">
      {props.tasks.map(task => (
        <li key={task.id} className="list-group-item">{task.content}</li>
      ))}
    </ul>
  );
}

function Config(props) {
  return <button className="btn btn-success m-2" onClick={e => props.onClick(e)}>Authorize</button>
}

export default TodoistWidget;
