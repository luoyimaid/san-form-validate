import './style/index.less';
import {Component} from 'san';
import ButtonComponent from '../button';

export default class Submit extends Component {
    static template = /* html */`
        <div class="submit">
            <form ref="myForm">
                <input placeholder="姓名" value="{= formData.name =}" name="name" />
                <br>
                <input placeholder="电话" value="{= formData.tel =}" name="tel" />
                <br>
                <select name="habit" value="{= formData.habit =}">
                    <option value="">无</option>
                    <option value="唱歌">唱歌</option>
                    <option value="跳舞">跳舞</option>
                    <option value="画画">画画</option>
                </select>
                <br>
                <com-button
                    text="保存"
                    validateData="{{validateData}}"
                    formData="{{formData}}"
                />
            </form>
        </div>
    `;

    static components = {
        'com-button': ButtonComponent
    }

    initData() {
        return {
            show: true,
            formData: {
                name: '',
                tel: '',
                habit: ''
            },
            validateData: {
                ref: 'myForm',
                formData: 'formData',
                fields: ['name', 'tel', 'habit'],
                rules: {
                    name: [
                        {
                            validator: 'required',
                            msg: '必填'
                        },
                        {
                            validator: 'max:8 min:5',
                            msg: '姓名长度在 5 ~ 8 之间'
                        }
                    ],
                    tel: [
                        {
                            validator: 'mobile',
                            msg: '请输入正确的手机号码'
                        }
                    ],
                    habit: [
                        {
                            validator: 'required',
                            msg: '必填'
                        },
                        {
                            validator: val => val
                        }
                    ]
                }
            }
        };
    }
}
