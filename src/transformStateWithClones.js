'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArray = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case 'removeProperties':
        for (const key in keysToRemove) {
          delete stateCopy[keysToRemove[key]];
        }
        stateArray.push({ ...stateCopy });
        continue;
      case 'addProperties':
        for (const key in extraData) {
          stateCopy[key] = extraData[key];
        }
        stateArray.push({ ...stateCopy });
        continue;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        stateArray.push({ ...stateCopy });
        continue;
    }
  }

  return stateArray;
}

transformStateWithClones(
  {
    foo: 'bar',
    bar: 'foo',
  },
  [
    {
      type: 'addProperties',
      extraData: { yet: 'another property' },
    },
    { type: 'clear' },
    {
      type: 'addProperties',
      extraData: {
        foo: 'bar',
        name: 'Jim',
        some: 'thing',
        whats: 'up',
      },
    },
    {
      type: 'removeProperties',
      keysToRemove: ['foo', 'some'],
    },
  ],
);

module.exports = transformStateWithClones;
