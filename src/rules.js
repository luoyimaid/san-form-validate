const regexpMap = {
    // 手机校验
    mobile: /^1\d{10}$/,
    // 网址校验
    url: /^((http|https|ftp|rstp|mms)?:\/\/)[^\s]+/,
    // 身份证格式校验
    identificationCard: /^\d{13,17}[0-9xX]$/,
    // 手机号码校验
    tel: /(^(\d{3,4}-)?\d{7,8})$|(^1\d{10})/
};

class Rules {
    constructor(regexpMap) {
        this.regexpMap = regexpMap;
        this.rules = {};
        this.createRegexpRule();
    }

    // 根据正则创建键值相同的校验方法
    createRegexpRule() {
        return Object.keys(this.regexpMap)
            .reduce((res, currentValue) => {
                res[currentValue] = val => this.regexpMap[currentValue].test(val + '');
                return res;
            }, this.rules);
    }

    // 允许用户传入正则表达式来扩展
    extendRegexp(regMap) {
        this.regexpMap = {
            ...this.regexpMap,
            ...regMap
        };
        return this.createRegexpRule();
    }

    // 允许用户传入校验方法来扩展
    extendValidator(validatorMap) {
        this.rules = {
            ...this.rules,
            ...validatorMap
        };
        return this.rules;
    }
};

export default new Rules(regexpMap);
