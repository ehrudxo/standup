import Card from '../Card'
import React from 'react';
import ReactDOM from 'react-dom';
import Article from './Article';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let cardInfo = Object.assign({},(new Article()).cardInfo);
  ReactDOM.render(<Card cardInfo={cardInfo}/>, div);
});
