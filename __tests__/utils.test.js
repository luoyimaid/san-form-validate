/**
 * class utils test
 *
 * @author luoyi06
 */

import {
    throttle,
    createLengthValidate,
    createValidator,
    verifySingle,
    verifyAll
} from '../src/utils';
import {formDataTrue, formDataError, validateData} from '../mock';

const rulesConfig = validateData.rules;

// .toHaveBeenCalledTimes(2): 校验方法被调用次数

describe('节流函数,一段时间内连续输入只生效一次', () => {
    jest.useFakeTimers();

    it('指定时间间隔', () => {
        let func = jest.fn();
        let throttleFunc = throttle(func, 1000);
        throttleFunc();

        // 零次调用
        expect(func).toHaveBeenCalledTimes(0);

        // setTimeout 2000, 两次调用
        setTimeout(() => {
            expect(func).toHaveBeenCalledTimes(2);
            expect(func).toHaveBeenLastCalledWith(expect.any(Function), 1000);
        }, 2000);
    });
    it('不指定时间间隔', () => {
        let func = jest.fn();
        let throttleFunc = throttle(func);
        throttleFunc();

        // 零次调用
        expect(func).toHaveBeenCalledTimes(0);

        // setTimeout 2000, 两次调用
        setTimeout(() => {
            expect(func).toHaveBeenCalledTimes(2);
            expect(func).toHaveBeenLastCalledWith(expect.any(Function), 300);
        }, 600);
    });
});

// .toBeInstanceOf(Object)：校验返回值是否是对象
// .toEqual(item)：校验返回结果全等于item
// .not.toBe(item)：校验返回结果不等于item

describe('校验单个表单输入', () => {
    it('校验表单不为空的正确输入', () => {
        for (let i in formDataTrue) {
            let validateResult = {
                name: i,
                msg: '',
                valid: true,
            };

            expect(verifySingle(i, formDataTrue[i], rulesConfig[i]))
                .toBeInstanceOf(Object);

            expect(verifySingle(i, formDataTrue[i], rulesConfig[i]))
                .toEqual(validateResult);
        }
    });
    it('校验表单为空的正确输入', () => {
        let name = 'hobit';
        let validateResult = {
            name: 'hobit',
            msg: '',
            valid: true,
            validator: 'max:8 min:5'
        };
        const rulesConfig = [{
            validator: 'max:8 min:5',
            msg: '姓名长度在 5 ~ 8 之间'
        }];

        expect(verifySingle(name, '', rulesConfig))
            .toBeInstanceOf(Object);

        expect(verifySingle(name, '', rulesConfig))
            .toEqual(validateResult);
    });
    it('校验有错误message的错误输入', () => {
        for (let i in formDataError) {
            let validateResult = {
                name: i,
                msg: '',
                valid: true,
            };

            expect(verifySingle(i, formDataError[i], rulesConfig[i]))
                .toBeInstanceOf(Object);

            expect(verifySingle(i, formDataError[i], rulesConfig[i]))
                .not.toBe(validateResult);
        }
    });
    it('校验没有错误message的错误输入', () => {
        let name = 'name';
        let validateResult = {
            name: 'name',
            msg: '',
            valid: true,
            validator: 'max:8 min:5'
        };
        const rulesConfig = [{
            validator: 'max:8 min:5',
            msg: ''
        }];

        expect(verifySingle(name, 'name', rulesConfig))
            .toBeInstanceOf(Object);

        expect(verifySingle(name, 'name', rulesConfig))
            .not.toBe(validateResult);
    });
});

describe('校验所有表单输入', () => {
    let validateResult = {
        name: {name: 'name', valid: true, msg: ''},
        tel: {name: 'tel', valid: true, msg: ''},
        habit: {name: 'habit', valid: true, msg: ''}
    };

    it('校验正确输入', () => {
        expect(verifyAll(formDataTrue, rulesConfig))
            .toBeInstanceOf(Object);

        expect(verifyAll(formDataTrue, rulesConfig))
            .toEqual(validateResult);
    });
    it('校验错误输入', () => {
        expect(verifyAll(formDataTrue, rulesConfig))
            .toBeInstanceOf(Object);

        expect(verifyAll(formDataTrue, rulesConfig))
            .not.toBe(validateResult);
    });
});

// .toThrow()：抛出异常

describe('解析校验字符串长度规则', () => {
    it('校验正确返回值', () => {
        const rules = 'max:8 min:5';
        expect(createLengthValidate(rules))
            .toBeInstanceOf(Function);
    });
    it('校验错误返回值', () => {
        const rules = 'max:5 min:8';
        // rules 校验失败，抛出一个错误
        expect(() => {
            createLengthValidate(rules);
        }).toThrow();
    });
});

describe('校验validator值类型, 统一封装为函数', () => {
    it('校验validator为string类型值', () => {
        let validator = 'max:8 min:5';
        expect(createValidator(validator))
            .toBeInstanceOf(Function);
    });
    it('校验validator为required 必选类型值', () => {
        expect(createValidator('required'))
            .toBeInstanceOf(Function);
    });
    it('校验validator未被定义', () => {
        expect(() => {
            createValidator('validator');
        }).toThrow();
    });
    it('校验validator为无法识别类型值', () => {
        expect(() => {
            createValidator({});
        }).toThrow();
    });
    it('校验validator为正则类型值', () => {
        let validator = /^((http|https|ftp|rstp|mms)?:\/\/)[^\s]+/;

        expect(createValidator(validator))
            .toBeInstanceOf(Function);
        expect(createValidator(validator)(/^(http?:\/\/)[^\s]+/))
            .toEqual(false);
    });
    it('校验validator为function类型值', () => {
        let validator = val => !!val;
        expect(createValidator(validator))
            .toBeInstanceOf(Function);
    });
});
