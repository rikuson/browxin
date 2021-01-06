import { Component } from 'react';
import Api from './lib/TodoistApi';

class TodoistWidget extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
  }
  handleSubmitToken(token) {
    const api = new Api(token);
    api.readTasks().then(tasks => this.setState({ tasks }));
  }
  render() {
    return this.state.tasks.length ? <TaskList tasks={this.state.tasks} /> : <Config onSubmitToken={token => this.handleSubmitToken(token)} />;
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

class Config extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
    };
  }
  handleChange(e) {
    const token = e.target.value;
    this.setState({ token });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmitToken(this.state.token);
  }
  render() {
    return (
      <form className="p-3" onSubmit={e => this.handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="todoist-token">Api Token</label>
          <input type="text" className="form-control" id="todoist-token" aria-describedby="tokenHelp" onChange={e => this.handleChange(e)} value={this.state.token} />
          <small id="tokenHelp" className="form-text text-muted">You can check your token <a href="https://todoist.com/prefs/integrations" target="_blank" rel="noreferrer">here</a>.</small>
        </div>
        <div className="text-right">
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>
    );
  }
}
export default TodoistWidget;
