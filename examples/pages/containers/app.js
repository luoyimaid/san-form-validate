/**
 * @file 容器组件
 * @author luoyi06 <luoyi06@baidu.com>
 */

import {Component} from 'san';
import './app.less';
import Submit from '@components/submit';

export default class App extends Component {

    static template = /* html */`
        <div class="main">
            <div>hello, {{name}}!</div>
            <com-submit />
        </div>
    `;

    static components = {
        'com-submit': Submit
    }

    initData() {
        return {
            name: 'luoyi_maid'
        };
    }
}

