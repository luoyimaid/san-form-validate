/**
 * @file services/index.js
 * @author luoyi06 <luoyi06@baidu.com>
 */
import fly from 'flyio';

export const getData = () => fly.get('/api/getData');
export const publish = data => fly.post('/api/publish', data);
