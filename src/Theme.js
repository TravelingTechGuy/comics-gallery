import React from 'react';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

import './Theme.css';

export const getBrowserTheme = () => {
  const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  return mql && mql.matches;
};

export const ThemeSwitch = ({onChange, defaultChecked = false}) => 
  <Switch
    defaultChecked={defaultChecked}
    onChange={onChange}
    checkedChildren="🌙"
    unCheckedChildren="🌞"
    className="themeButton"
  />;
