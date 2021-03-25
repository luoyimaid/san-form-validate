/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file test entry file
 */

let regx = './.*\\.spec\\.js$';
const jestArgs = ['--runInBand', '--detectOpenHandles', ...(regx ? [regx] : [])];

console.log(`running jest with args: ${jestArgs.join(' ')}`);
/* eslint-disable jest/no-jest-import */
require('jest').run(jestArgs);
