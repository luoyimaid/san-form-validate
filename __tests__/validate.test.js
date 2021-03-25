/**
 * class Vily test
 *
 * @author luoyi06
 */
import Vily from '../src/validate';
import {formDataTrue, formDataError, validateData} from '../mock';

const rulesConfig = validateData.rules;
const vily = new Vily(formDataTrue, rulesConfig);
const vilyError = new Vily(formDataError, rulesConfig);

describe('初始化校验结果', () => {
    it('校验 校验结果为对象', () => {
        expect(vily.initSRes())
            .toBeInstanceOf(Object);
    });
    it('初始化校验结果', () => {
        let result = {
            name: {
                name: 'name',
                valid: true,
                msg: '',
                validator: ''
            },
            tel: {
                name: 'tel',
                valid: true,
                msg: '',
                validator: ''
            },
            habit: {
                name: 'habit',
                valid: true,
                msg: '',
                validator: ''
            }
        };
        expect(vily.sRes).toEqual(result);
    });
    it('校验 校验规则是否正确', () => {
        expect(vily.ruleConfig).toEqual(rulesConfig);
    });
});

describe('校验表单 函数', () => {
    it('不传参时，校验整个表单, 并且表单校验正确', () => {
        expect(vily.verifyAll()).toEqual({valid: true, msg: ''});
    });
    it('不传参时，校验整个表单，并且表单校验失败', () => {
        expect(vilyError.verifyAll()).toEqual({
            msg: '姓名长度在 5 ~ 8 之间',
            name: 'name',
            valid: false,
            validator: 'max:8 min:5'
        });
    });
    it('不传参时，校验整个表单, 并且表单校验正确', () => {
        expect(vily.verify()).toEqual({valid: true, msg: ''});
    });
    it('不传参时，校验整个表单，并且表单校验失败', () => {
        expect(vilyError.verify()).toEqual({
            msg: '姓名长度在 5 ~ 8 之间',
            name: 'name',
            valid: false,
            validator: 'max:8 min:5'
        });
    });
    it('传参时，校验姓名表单, 并且表单校验正确', () => {
        expect(vily.verify('name', formDataTrue.name)).toEqual({
            name: 'name',
            valid: true,
            msg: ''
        });
    });
    it('传参时，校验姓名表单, 并且表单校验失败', () => {
        expect(vilyError.verify('name', formDataError.name)).toEqual({
            name: 'name',
            valid: false,
            msg: '姓名长度在 5 ~ 8 之间',
            validator: 'max:8 min:5'
        });
    });
    it('传参时，校验电话表单, 并且表单校验正确', () => {
        expect(vily.verify('tel', formDataTrue.tel)).toEqual({
            name: 'tel',
            valid: true,
            msg: ''
        });
    });
    it('传参时，校验电话表单, 并且表单校验失败', () => {
        expect(vilyError.verify('tel', formDataError.tel)).toEqual({
            name: 'tel',
            valid: false,
            msg: '请输入正确的手机号码',
            validator: 'mobile'
        });
    });
    it('传参时，校验爱好表单, 并且表单校验正确', () => {
        expect(vily.verify('habit', formDataTrue.habit)).toEqual({
            name: 'habit',
            valid: true,
            msg: ''
        });
    });
    it('传参时，校验爱好表单, 并且表单校验失败', () => {
        expect(vilyError.verify('habit', formDataError.habit))
            .toEqual({msg: '必填', name: 'habit', valid: false, validator: 'required'});
    });
});
