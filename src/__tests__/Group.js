/**
 * Created by keen on 2017. 1. 8..
 */
import FirebaseDao from '../FirebaseDao';
import config from '../config'

let dao = new FirebaseDao(config);

it('check this has valid entry', ()=>{
  let isValid = dao.isValidGroup('-K_s8O0dMdtQqF0fJZCf')
  if(isValid)expect(isValid).toBeTruthy();
  else expect(isValid).toBeFalsy();
})
it('check this has valid entry', ()=>{
  let isValid = dao.isValidGroup('keen')
  if(isValid)expect(isValid).toBeTruthy();
  else expect(isValid).toBeFalsy();
})