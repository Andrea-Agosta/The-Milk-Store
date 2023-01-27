import request from 'supertest';
import app from '../app';

describe('Testing api endpoint', () => {
  test('GET request to api/milk', async () => {
    const res = await request(app).get('/api/milk');
    expect(res.statusCode).toEqual(200);
  });

  test('GET request to api/milk/:id', async () => {
    const res = await request(app).get('/api/milk/a83d309f-ebe5-4bed-9555-bc18869d98ca');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      "name": "Elliot's voiceless cashew milk",
      "type": "Cashew milk",
      "storage": 87,
      "id": "a83d309f-ebe5-4bed-9555-bc18869d98ca"
    });
  });

  test('GET request to api/milk/:id with a wrong id', async () => {
    const res = await request(app).get('/api/milk/wrongID');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Bad Request' });
  });
});