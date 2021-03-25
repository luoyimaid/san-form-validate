import {
    verifySingle,
    verifyAll
} from './utils';

export default class Vily {
    constructor(data, ruleConfig, reactive = true) {
        this.data = data;
        this.ruleConfig = ruleConfig;
        this.sRes = {}; // 校验结果
        this.initSRes();
        // reactive && this.initReactive();
    }

    /**
     * 初始化校验结果
     */
    initSRes() {
        this.sRes = Object.keys(this.ruleConfig)
            .reduce((result, key) => ({
                ...result,
                [key]: {
                    name: key,
                    valid: true,
                    msg: '',
                    validator: ''
                }
            }), {});
        return this.sRes;
    }

    verify(key, value) {
        // 没有传入要校验的字段则校验整个表单
        if (!key && !value) {
            return this.verifyAll();
        }
        const verifyResult = verifySingle(key, value, this.ruleConfig[key]);

        // if (!verifyResult) {
        //     return null;
        // }
        return verifyResult;
    }

    verifyAll() {
        const result = verifyAll(this.data, this.ruleConfig);
        for (let key in result) {
            if (result.hasOwnProperty(key)) {
                if (!result[key].valid) {
                    return result[key];
                }
            }
        }
        return {
            valid: true,
            msg: ''
        };
    }
};
