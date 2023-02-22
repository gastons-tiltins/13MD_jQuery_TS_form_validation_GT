/**
 * @jest-environment jsdom
 */

import {validatePasswordSpecialChar} from './scripts';
import {checkNameLength} from './scripts';
import {validatePasswordLength} from './scripts';

describe('Pasword contains at least one special character', () => {
    it('Should return', () => {
        const result = validatePasswordSpecialChar('@');

        expect(result).toEqual(true);
    });
});

describe('Name length is between 2 and 50 chars long', () => {
    it('Should return', () => {
        const result = checkNameLength('Some text');

        expect(result).toEqual(true);
    });
});

describe('Passowrd length atleast 8 chars', () => {
    it('Should return', () => {
        const result = validatePasswordLength('8asdfasd3');
        expect(result).toEqual(true);
    });
});
