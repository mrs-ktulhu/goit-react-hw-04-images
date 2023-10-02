import React from 'react';
import { Buttons } from './Button.styled';

const Button = ({ onClick}) => (
  <Buttons type="button" onClick={onClick}>
    Load More
  </Buttons>
);


export default Button;
