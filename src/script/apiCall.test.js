import {processData} from './apiCall.js';

test('Tests than api call does not return error value', () => {
  return processData().then(data => {
    expect(data).toBe(5);
  });
});