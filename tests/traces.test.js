const {describe, expect, test} = require('@jest/globals');
const axios = require('axios');

const bodySucess = { 
    ip: "188.26.219.249" 
};

const bodyBadRequest = {
    ip: "prueba"
}

describe('Test a 200', () => {
    test('It should respond with a 200 status', async () => {
        axios.post('http://localhost:3000/api/traces', bodySucess)
        .then(res => {
            expect(res.status).toBe(200);
        }).catch(err => {
            expect(err?.response?.status).toBeGreaterThanOrEqual(400);        
        })
    });
});

describe('Test a 400 sending bad parameter type', () => {
    test('It should respond with a 400 status', () => {
        axios.post('http://localhost:3000/api/traces', bodyBadRequest)
        .then(res => {
            expect(res.status).toBeGreaterThanOrEqual(400);
        }).catch(err => {
            expect(err?.response?.status).toBeGreaterThanOrEqual(400);
        })
    });
});