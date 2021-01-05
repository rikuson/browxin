const bent = require('bent')

class TodoistApi {
  static get URL() {
    return 'https://api.todoist.com/rest/v1/tasks';
  }
  constructor(token) {
    this.token = token;
    this.header = { 'Authorization': 'Bearer ' + token };
  }
  createTask(task) {
    const request = bent(TodoistApi.URL, 'POST', 'json', 200);
    const body = {
      content: '',
      project_id: null,
      section_id: null,
      parent_id: null,
      parent: null,
      order: null,
      label_ids: null,
      priority: null,
      due_string: null,
      due_date: null,
      due_datetime: null,
      due_lang: null,
      assignee: null,
    };
    for (let key in body) {
      const value = task[key];
      if (value !== undefined && value !== null) {
        body[key] = value;
      } else {
        delete body[key];
      }
    }
    return request('', body, this.header);
  }
  readTasks() {
    const request = bent(TodoistApi.URL, 'GET', 'json', 200);
    return request('', null, this.header);
  }
  deleteTask(taskId) {
    const request = bent(TodoistApi.URL, 'DELETE', null, 203);
    return request('/' + taskId, null, this.header);
  }
}

export default TodoistApi;
