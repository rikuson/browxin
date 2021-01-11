const bent = require('bent')

class OAuth {
  static get URL() {
    return 'https://todoist.com';
  }
  fetchToken(code) {
    return new Promise((resolve, reject) => {
      const request = bent(OAuth.URL, 'POST', 'json', 200);
      const params = {
        client_id: process.env.REACT_APP_TODOIST_CLIENT_ID,
        client_secret: process.env.REACT_APP_TODOIST_CLIENT_SECRET,
        code,
      };
      request('/oauth/access_token', params)
        .then(res => resolve(res.access_token))
        .catch(reject);
    });
  }
}

class Rest {
  static get URL() {
    return 'https://api.todoist.com';
  }
  constructor(token) {
    this.setHeader(token);
  }
  createTask(task) {
    const request = bent(Rest.URL, 'POST', 'json', 200);
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
    return request('/rest/v1/tasks', body, this.header);
  }
  readTasks() {
    const request = bent(Rest.URL, 'GET', 'json', 200);
    return request('/rest/v1/tasks', null, this.header);
  }
  completeTask(taskId) {
    const request = bent(Rest.URL, 'POST', null, 204);
    return request(`/rest/v1/tasks/${taskId}/close`, null, this.header);
  }
  deleteTask(taskId) {
    const request = bent(Rest.URL, 'DELETE', null, 203);
    return request('/rest/v1/tasks/' + taskId, null, this.header);
  }
  setHeader(token) {
    this.header = { 'Authorization': 'Bearer ' + token };
  }
}

export { OAuth, Rest };
