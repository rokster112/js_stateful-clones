'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const newArr = [];
  let newObj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      newObj = { ...newObj, ...actions[i].extraData };
    } else if (actions[i].type === 'clear') {
      for (const key in newObj) {
        delete newObj[key];
      }
    } else if (actions[i].type === 'removeProperties') {
      newObj = { ...newObj };

      for (const key of actions[i].keysToRemove) {
        delete newObj[key];
      }
    }
    newArr.push({ ...newObj });
  }

  return newArr;
}
module.exports = transformStateWithClones;
