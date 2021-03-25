#!/usr/bin/env bash
# 保证build.sh脚本有任何错误就退出
set -e
export PATH=$NODEJS_BIN_LATEST:$PATH
echo "node: $(node -v)"
echo "npm: v$(npm -v)"
moduleName=san-form-validate
#编译生产hybrid模板
function makeHybrid() {
    # 如果NODE_ENV为production, npm5以上版本就不会安装devDependencies.
    NODE_ENV=development npm install
    # 为生产环境构建加NODE_ENV=production.
    NODE_ENV=production npm run build
}
function pack() {
    cd ./output
     # 检查是否包含es6，如果含有则退出build脚本
    static_output='./static'
    es6_num=`find $static_output -type f -name '*.js' | xargs egrep '\b(const|let)\s' | wc -l`
    if [ '0' = $es6_num ]
    then
        echo "Pass the es6 test"
    else
        echo "Failed to pass the es6 test"
        exit -1
    fi
    tar czf ./static-${moduleName}.tar.gz ./static
    tar czf ${moduleName}.tar.gz ./template
    rm -rf ./static
    rm -rf ./template
    rm -rf node_modules
    cd ..
}
makeHybrid && pack
