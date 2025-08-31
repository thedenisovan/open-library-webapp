import * as api from './apiCall.js';

test('Tests than api return correct data.', async () => {
  let data = await api.processBook('1984', 'Orwell');
  expect(data[0].first_publish_year).toEqual(1949);

  data = await api.processBook('Blood of elves');
  expect(data[0].first_publish_year).toEqual(2009);
});
