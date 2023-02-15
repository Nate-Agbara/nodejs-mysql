import { expect } from '@jest/globals';
const routes = require( '../../src/routes/userRoutes');

describe('userRoutes tests', () => {
    it('should be correctly exported', async () => {
        expect(typeof routes).toEqual('function');
    });
});

