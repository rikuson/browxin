import assert from 'assert';
import TodoistApi from './TodoistApi';

it('Should return task array', async () => {
  assert.ok(process.env.TODOIST_API_TOKEN);
  const todoistApi = new TodoistApi(process.env.TEST_TODOIST_API_TOKEN);
  const tasks = await todoistApi.readTasks();
  expect(Array.isArray(tasks)).toBe(true);
});
