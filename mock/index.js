/**
 * export mock data
 *
 * @author luoyi06
 */

const formDataTrue = {
    name: 'luoyi',
    tel: '15029144610',
    habit: '画画'
};

const formDataError = {
    name: 'luoyi_maid',
    tel: '12684359',
    habit: ''
};

const validateData = {
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
};

export {
    formDataTrue,
    formDataError,
    validateData
};
