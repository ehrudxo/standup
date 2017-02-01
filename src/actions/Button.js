import {BUTTON} from '../constants'

const GREY = '#AAA';
const PINK = '#FD478A';
const WHITE = 'white';

export function selectButton( button ){
  return {
    type : BUTTON,
    selectedButton : button,
    defaultStyle: _selectStyle(button).style_d,
    groupStyle: _selectStyle(button).style_g,
    editStyle: _selectStyle(button).style_e
  }
}
function _selectStyle(button){
  switch(button){
    case 'groups':
      return {
        style_d: {color: GREY},
        style_g: {color: PINK},
        style_e: {color: GREY}
      }
    case 'edit' :
      return {
        style_d: {color: GREY},
        style_g: {color: GREY},
        style_e: {color: PINK}
      }
    default:
      return {
        style_d: {color: WHITE},
        style_g: {color: GREY},
        style_e: {color: GREY}
      }
  }
};