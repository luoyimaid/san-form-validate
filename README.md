
# san-form-validate

> 这是一个 San 的 表单校验插件，主要目标是先约定一套校验规则，后统一走该方法校验表单，无需在表单组件里再重复去校验，或可以直接将该插件集成到无极表单组件中
> **背景**：
>> 之前做了个需求是写一个表单组件，其中表单组件的校验是比较麻烦的点，这里没有一套标准的校验规则，只能凭借Server返回的数据去一个一个校验，而Server也只是去透传上游校验规则;
>> 如果这个校验插件可以投入使用，我们就可以与Server约定好一套标准的校验规则去下发，我们边可以根据标准校验规则去使用这个插件；
>> 这样无论是哪一个业务方，只要是用了san框架，均可以使用该插件

## 快速开始

``` bash
# install 
yarn

# start
yarn start

# build 
yarn build

# test
yarn test

```

## 目录说明
```
├── __test__           # 单测文件
│   └── vily.spec.js
├── mock
├── scripts            # test入口
│   └── test.js
├── src                # 插件方法实现
│   ├── rules
│   |     └── rules.js
│   ├── utils
│   |     └── index.js
│   ├── vily
│   |     └── vily.js
├── examples
│   ├── assets         # 公共资源
│   │   └── font
│   ├── components     # UI组件
│   │   └── button
│   │   └── submit
│   ├── lib            # lib 库
│   │   ├── app.js
│   │   ├── store.js
│   ├── pages          # 页面相关
│   │   └── demo
├── node_modules
├── output
├── README.md
├── build.sh
├── ci.yml
├── package.json
├── pages.template.ejs
├── jsconfig.js
├── babel.config.js
└── san.config.js
```

## 使用
目前还没有生成npm包，直接路径引入使用
``` js
// 提交组件, 校验所有表单内容
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

    if(!validateResult.valid) {
        this.data.set('msg', validateResult.msg);
        this.ref('message').style.display = 'block';
    } else {
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
    }
}
```
```js
// 初始化数据&校验规则
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
            fields: [ 'name', 'tel', 'habit' ],
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
```
