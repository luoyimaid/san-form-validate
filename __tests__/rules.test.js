/**
 * class rules test
 *
 * @author luoyi06
 */
/* eslint-disable no-proto */
import rules from '../src/rules';

describe('校验 内置正则匹配规则', () => {

    it('校验身份证正则匹配', () => {
        expect(rules.regexpMap.identificationCard)
            .toEqual(/^\d{13,17}[0-9xX]$/);
    });
    it('校验手机号正则匹配', () => {
        expect(rules.regexpMap.mobile)
            .toEqual(/^1\d{10}$/);
    });
    it('校验座机电话正则匹配', () => {
        expect(rules.regexpMap.tel)
            .toEqual(/(^(\d{3,4}-)?\d{7,8})$|(^1\d{10})/);
    });
    it('校验url正则匹配', () => {
        expect(rules.regexpMap.url)
            .toEqual(/^((http|https|ftp|rstp|mms)?:\/\/)[^\s]+/);
    });
});

describe('内置正则封装为函数', () => {
    it('身份证信息封装为函数', () => {
        expect(rules.rules.identificationCard)
            .toBeInstanceOf(Function);
    });
    it('手机号信息封装为函数', () => {
        expect(rules.rules.mobile)
            .toBeInstanceOf(Function);
    });
    it('座机电话信息封装为函数', () => {
        expect(rules.rules.tel)
            .toBeInstanceOf(Function);
    });
    it('url信息封装为函数', () => {
        expect(rules.rules.url)
            .toBeInstanceOf(Function);
    });
});

describe('原型方法test', () => {
    it('允许用户传入正则表达式来扩展', () => {
        expect(rules.__proto__.extendRegexp)
            .toBeInstanceOf(Function);
        expect(rules.extendRegexp(/[ -~]/))
            .toBeInstanceOf(Object);
    });
    it('允许用户传入校验方法来扩展', () => {
        const validatorMap = {
            validator: 'required',
            msg: '必填'
        };
        expect(rules.__proto__.extendValidator)
            .toBeInstanceOf(Function);
        expect(rules.extendValidator(validatorMap))
            .toBeInstanceOf(Object);
    });
});
