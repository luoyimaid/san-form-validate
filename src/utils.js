import defaultRules from './rules';

export const throttle = (fn, delay = 300) => () => {
    fn.timer && clearTimeout(fn.timer);
    fn.timer = setTimeout(() => {
        fn();
    }, delay);
};

/**
 * 解析校验字符串长度规则
 * 将形如："min:5""max:8""min:5 max:8" 的字符串解析成校验字符串长度的校验函数
 * @param rule: string
 * @returns {function({length: number}): boolean}
 */
export const createLengthValidate = rules => {
    const reg = /^(m(ax|in):(\d+))(\sm(ax|in):(\d+)){0,1}$/;
    const matchResult = rules.match(reg);
    let min = 0;
    let max = 0;

    matchResult[2] === 'in'
        ? min = matchResult[3]
        : max = matchResult[3];
    if (matchResult[4] && matchResult[2] !== matchResult[5]) {
        matchResult[5] === 'ax'
            ? max = matchResult[6]
            : min = matchResult[6];
    }
    if ((min && max) && (~~min > ~~max)) {
        throw new Error('最小长度不能大于最大长度');
    }
    return ({length}) => {
        return !((min && ~~min > length) || (max && ~~max < length));
    };
};

/**
 * 验证 validator 的值类型，将其统一包装成函数
 * @param validator
 * @returns Function
 */
export const createValidator = validator => {
    const regExt = /^(m(ax|in):(\d+))(\sm(ax|in):(\d+)){0,1}$/;
    if (typeof validator === 'string') {
        if (defaultRules.rules[validator]) {
            return defaultRules.rules[validator];
        }
        else if (validator === 'required') {
            return val => !!val;
        }
        else if (regExt.test(validator)) {
            return createLengthValidate(validator);
        }

        throw new Error(`您还没有定义${validator} 这条规则`);

    }
    else if (validator instanceof RegExp) {
        return val => validator.test(val);
    }
    else if (validator instanceof Function) {
        return validator;
    }
    else {
        throw new Error('validator 的值只能是函数或者正则表达式');
    }
};

/**
 * 校验单个表单输入
 * @param name 表单的key
 * @param value 表单输入值
 * @param rules 表单校验规则
 * @returns Object
 */
export const verifySingle = (name, value, rules) => {

    const required = rules.some(
        rule => rule.validator === 'required'
    );

    for (let i = 0; i < rules.length; i++) {
        const {msg, validator} = rules[i];
        if (value === '' && !required) {
            return {name, valid: true, msg: '', validator};
        }
        else if (!createValidator(validator)(value)) {
            return {
                name,
                msg: msg || '默认校验不通过消息',
                valid: false,
                validator
            };
        }
    }
    return {
        name,
        valid: true,
        msg: ''
    };
};

/**
 * 校验单个表单输入
 * @param data formData
 * @param rules 表单校验规则
 * @returns Object
 */
export const verifyAll = (data, rules) => {
    return Object.keys(rules).reduce((res, item) => {
        res[item] = verifySingle(item, data[item], rules[item]);
        return res;
    }, {});
};
