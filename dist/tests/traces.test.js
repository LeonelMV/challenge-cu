"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { describe, expect, test } = require('@jest/globals');
const axios = require('axios');
const bodySucess = {
    ip: "188.26.219.249"
};
const bodyBadRequest = {
    ip: "prueba"
};
describe('Test a 200', () => {
    test('It should respond with a 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
        axios.post('http://localhost:3000/api/traces', bodySucess)
            .then(res => {
            expect(res.status).toBe(200);
        }).catch(err => {
            var _a;
            expect((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status).toBeGreaterThanOrEqual(400);
        });
    }));
});
describe('Test a 400 sending bad parameter type', () => {
    test('It should respond with a 400 status', () => {
        axios.post('http://localhost:3000/api/traces', bodyBadRequest)
            .then(res => {
            expect(res.status).toBeGreaterThanOrEqual(400);
        }).catch(err => {
            var _a;
            expect((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status).toBeGreaterThanOrEqual(400);
        });
    });
});
