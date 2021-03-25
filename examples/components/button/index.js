
import './style/index.less';
import {Component} from 'san';
import Vily from '@src';

export default class ButtonComponent extends Component {
    static template = /* html */`
        <div class="wrapper">
            <div class="message" s-ref="message">{{msg}}</div>
            <input type="button" value="{{text}}" on-click="handleSubmit(validateData)">
        </div>
    `;
    handleSubmit(validateData) {
        let formData = this.data.get('formData');
        const vily = new Vily(formData, validateData.rules);
        let validateResult = vily.verify();
        if (!validateResult.valid) {
            this.data.set('msg', validateResult.msg);
            this.ref('message').style.display = 'block';
        }
        else {
            this.ref('message').style.display = 'none';
            console.log('do something');
        }
    }
    initdata() {
        return {
            text: {
                required: true,
                type: String
            },
            msg: ''
        };
    }
}
