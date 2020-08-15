import React from 'react';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

export const getBrowserTheme = () => {
  const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  return mql && mql.matches ? 'dark' : 'light';
};

export const ThemeSwitch = ({onChange, defaultValue}) => 
  <Switch
    defaultChecked={defaultValue}
    onChange={onChange}
    checkedChildren="🌞"
    unCheckedChildren="🌙"
    className="themeButton"
  />;
