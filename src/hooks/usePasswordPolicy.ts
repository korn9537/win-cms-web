import _ from 'lodash';
import { type } from 'os';
import { useMemo } from 'react';

type PasswordPolicyOption = {
  minLength: number;
  enabled: boolean;
};

type PasswordPolicyErors = {
  has_length: boolean;
  has_uppercase: boolean;
  has_lowercase: boolean;
  has_number: boolean;
  // has_character: boolean
};

// type PasswordPolicyResult = {
//   validate: {
//     errors: PasswordPolicyErors;
//     is_valid: boolean;
//   };
//   check: (password: string) => {
//     errors: PasswordPolicyErors;
//     is_valid: boolean;
//   };
// };

type PasswordPolicyResult = {
  errors: PasswordPolicyErors;
  is_valid: boolean;
};

export const usePasswordPolicy = (
  password: string,
  options = { minLength: 6, enabled: true },
): PasswordPolicyResult => {
  const check = (password = '') => {
    let errors = {
      has_length: false,
      has_uppercase: false,
      has_lowercase: false,
      has_number: false,
      // has_character: false
    };

    errors.has_length = password.length < options.minLength;
    errors.has_lowercase = /[a-z]/.test(password) == false;
    errors.has_uppercase = /[A-Z]/.test(password) == false;
    errors.has_number = /\d/.test(password) == false;
    // errors.has_character = /[^a-zA-Z0-9]/.test(password) == false;

    let is_valid = true;

    if (password != '') {
      _.forEach(errors, (value, name) => {
        if (value == true) {
          is_valid = false;
        }
      });
    }

    return {
      errors,
      is_valid,
    };
  };

  const validate = useMemo(() => {
    if (options.enabled) {
      return check(password);
    }

    return check('');
  }, [password]);

  // return { validate, check };

  return validate;
};
