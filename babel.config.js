/**
 * @file babel config
 */
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            }
        ]
    ],
    plugins: [
        ['@babel/plugin-proposal-decorators', {'legacy': true}],
        ['@babel/plugin-proposal-class-properties', {'loose': true}]
    ]
    // exclude: 'node_modules'
};