// sitemap-generator.js

import register from '@babel/register';
register({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

import router from './src/App';
import { Sitemap } from 'react-router-sitemap';

const sitemap = new Sitemap(router)
  .build('https://alekhart-codes-v1.netlify.app/')
  .save('./public/sitemap.xml');
