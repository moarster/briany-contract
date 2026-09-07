'use strict';

const { oas } = require('@stoplight/spectral-rulesets');
const { truthy, enumeration, schema, pattern } = require('@stoplight/spectral-functions');

module.exports = {
  extends: [[oas, 'recommended']],
  rules: {
    'oas3-api-servers': 'off',
    'info-contact': 'off',

    'operation-operationId': 'error',
    'operation-tags': 'error',

    'operation-has-summary': {
      description: 'Every operation should have a summary.',
      severity: 'warn',
      given: '$.paths[*][get,post,put,patch,delete,options,head,trace]',
      then: { field: 'summary', function: truthy },
    },


    'tag-description': {
      description: 'Every tag must have a description.',
      severity: 'warn',
      given: '$.tags[*]',
      then: { field: 'description', function: truthy },
    },

    'component-name-pascal-case': {
      description: 'Schema names should use PascalCase.',
      severity: 'warn',
      given: '$.components.schemas[*]~',
      then: {
        function: pattern,
        functionOptions: { match: '^[A-Z][a-zA-Z0-9]*$' },
      },
    },
  },
};
