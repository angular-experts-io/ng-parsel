# [3.1.0](https://github.com/angular-experts-io/ng-parsel/compare/v3.0.2...v3.1.0) (2023-05-16)


### Bug Fixes

* 🐛 write service output files ([781bee5](https://github.com/angular-experts-io/ng-parsel/commit/781bee5031bb0d7f6ef506fd9b87c57f83ef74c1))


### Features

* 🎸 add parseServices to default config ([6b97e5b](https://github.com/angular-experts-io/ng-parsel/commit/6b97e5b9edd79e409d9595b058d45d9f74e55b25))
* 🎸 parse services ([d2a9c91](https://github.com/angular-experts-io/ng-parsel/commit/d2a9c91ccf31b63a1cb4a00dfdf83ba02cceed82))

## [3.0.2](https://github.com/angular-experts-io/ng-parsel/compare/v3.0.1...v3.0.2) (2022-11-30)


### Bug Fixes

* 🤖 (node) support node 14 ([0d2c38e](https://github.com/angular-experts-io/ng-parsel/commit/0d2c38eec66f811aea63544155d98e9d026f2c84))

## [3.0.1](https://github.com/angular-experts-io/ng-parsel/compare/v3.0.0...v3.0.1) (2022-11-30)


### Bug Fixes

* 🐛 (parse) call harness parser ([414e680](https://github.com/angular-experts-io/ng-parsel/commit/414e68027ee1698337777772fac9ed77fc1aeaa5))

# [3.0.0](https://github.com/angular-experts-io/ng-parsel/compare/v2.0.0...v3.0.0) (2022-11-30)


### Bug Fixes

* 🐛 (investigator) detect validators ([eff6660](https://github.com/angular-experts-io/ng-parsel/commit/eff66605f260011fc1f82dc168036b01f2276980))
* 🐛 (parsel) adjust package.json URLs ([7847c10](https://github.com/angular-experts-io/ng-parsel/commit/7847c10a5ac66b959abadcdb44519f51e87378a7))
* 🐛 (parser) validtor and harness parser output properties ([38c0445](https://github.com/angular-experts-io/ng-parsel/commit/38c04453f2cfadf9e7ca83c53e7347cec448b2ce))


### Features

* 🎸 (esm) convert library to ESM ([cbb3bcd](https://github.com/angular-experts-io/ng-parsel/commit/cbb3bcd0a671e4022b7f9b41e6abfcc6fb76398f))
* 🎸 (filepath) export filepath for all types ([de7f8ed](https://github.com/angular-experts-io/ng-parsel/commit/de7f8edcc86d2ff26bea110cc979774d37bcc0cd))
* 🎸 (types) export types subentry for browser usage ([6219283](https://github.com/angular-experts-io/ng-parsel/commit/62192838e0436a9d7c21ad80860bea63665ddc02))
* 🎸 (welcome) print welcome messages ([599c813](https://github.com/angular-experts-io/ng-parsel/commit/599c81378d1c0debf6fa40db7c17e72396e7802a))


### BREAKING CHANGES

* 🧨 ESM - Library is now published as ESM
* 🧨 rename methods to methodsPublicExplicit for harness and validator
parsers

# [2.0.0](https://github.com/angular-experts-io/ng-parsel/compare/v1.1.2...v2.0.0) (2022-11-29)


### Features

* 🎸 (className) add className to all types ([c890cf0](https://github.com/angular-experts-io/ng-parsel/commit/c890cf0654cfaad3eeaf068d71643a7d4a9dea31))
* 🎸 (components) parse CVA ([44b9487](https://github.com/angular-experts-io/ng-parsel/commit/44b94872dbc9ed26d5da77bdb69b478f151965bb))
* 🎸 (parse) add validator and change output file names ([d85ad2e](https://github.com/angular-experts-io/ng-parsel/commit/d85ad2eadbcb28c132a8a929a9eb11e81c7b9670))
* 🎸 (parse) parse validators and change output format ([c6cb686](https://github.com/angular-experts-io/ng-parsel/commit/c6cb6868f8b02a879969400671c3020578fef78d))


### BREAKING CHANGES

* 🧨 Output files filename is now in plural - ng-parsel-component becomes
ng-parsel-components and so on
* 🧨 Output files are now plural

## [1.1.2](https://github.com/angular-experts-io/ng-parsel/compare/v1.1.1...v1.1.2) (2022-11-29)


### Bug Fixes

* 🐛 (declarations) add missing declaration files ([6f75afb](https://github.com/angular-experts-io/ng-parsel/commit/6f75afb98f804876693110b088bdb43b1361119f))
* 🐛 (declarations) add TypeScript declaration files ([7874183](https://github.com/angular-experts-io/ng-parsel/commit/7874183499cfa27e072f8cc742f24bac341e2739))

## [1.1.1](https://github.com/angular-experts-io/ng-parsel/compare/v1.1.0...v1.1.1) (2022-11-29)


### Bug Fixes

* 🐛 (parse) adjust cosmiconfig module name ([21ff568](https://github.com/angular-experts-io/ng-parsel/commit/21ff568e8efb8d478e6d7fcd63c464dd10499afb))

# [1.1.0](https://github.com/angular-experts-io/ng-parsel/compare/v1.0.0...v1.1.0) (2022-11-28)


### Features

* 🎸 (parser) add harness parser ([9639eb5](https://github.com/angular-experts-io/ng-parsel/commit/9639eb5b7b3cccb0e0ee6ea2505266ff015d573f))

# 1.0.0 (2022-11-28)


### Bug Fixes

* 🐛 (parse) correctly parse output files ([89ce8b4](https://github.com/angular-experts-io/ng-parsel/commit/89ce8b4a56a30d29a440ac507c9577f3a13e2804))
* 🐛 (parse) pass around parsed arrays instead of object ([a74eec8](https://github.com/angular-experts-io/ng-parsel/commit/a74eec8156364bcb3a8c83714c7772ecf9eb3c76))


### Features

* 🎸 (commander) setup commander ([8104226](https://github.com/angular-experts-io/ng-parsel/commit/8104226bab8e4a02b31a443465d89c17562cab21))
* 🎸 (config) generate configuration file ([7e20f9a](https://github.com/angular-experts-io/ng-parsel/commit/7e20f9a7242d52996629da7537eef12b6a607234))
* 🎸 (init) generate json file ([8ab8ec3](https://github.com/angular-experts-io/ng-parsel/commit/8ab8ec352c9847b6394bfa8fe47323a0fa2c8076))
* 🎸 (logo) add logo ([23b14cf](https://github.com/angular-experts-io/ng-parsel/commit/23b14cfca0a308ec3875fb56f9bda0f492842302))
* 🎸 (output) pipes and specs ([dccd12c](https://github.com/angular-experts-io/ng-parsel/commit/dccd12c8c4ae8cccbbc970815f6d4747d81ac28d))
* 🎸 (output) write files to directory ([70d6680](https://github.com/angular-experts-io/ng-parsel/commit/70d6680f358d13ede34b2340d9856825bc8410c4))
* 🎸 (parse) add spec parser ([2f75759](https://github.com/angular-experts-io/ng-parsel/commit/2f75759ab676d0547a0ffde037c3ae9800b4fca1))
* 🎸 (parse) outputs ([450c626](https://github.com/angular-experts-io/ng-parsel/commit/450c6267fbdfe09d177d63e72c7fe96a2172648f))
* 🎸 (parse) parse additional explicit public methods ([bc647ed](https://github.com/angular-experts-io/ng-parsel/commit/bc647eddca70f06775be0fc62fe5976ea590cf9a))
* 🎸 (parse) parse component implementation ([2fdaa91](https://github.com/angular-experts-io/ng-parsel/commit/2fdaa91ee54aaa80f1aa207d55260d4580e2bf24))
* 🎸 (parse) spit out first parsed component ([8e808b1](https://github.com/angular-experts-io/ng-parsel/commit/8e808b1cb4d3104e45e93afad65737e3114cc1af))
* 🎸 (parser) add directive parser ([caf85fd](https://github.com/angular-experts-io/ng-parsel/commit/caf85fd50d05e3d6be587cca265c6f52ad8e5c79))
* 🎸 (parser) add module parser ([fb5d610](https://github.com/angular-experts-io/ng-parsel/commit/fb5d610e05366f31dad1882392a2235843c793af))
* 🎸 (parser) add pipe parser ([d300682](https://github.com/angular-experts-io/ng-parsel/commit/d3006825dc67bae9504ba72e979f13a404d8d186))
* 🎸 (parser) extend field decorators ([db44105](https://github.com/angular-experts-io/ng-parsel/commit/db44105334ed14ebe9c9f8f714f20b332ce47a6e))
* 🎸 (parser) parse component inputs ([d8013f7](https://github.com/angular-experts-io/ng-parsel/commit/d8013f707e6f652256f2af8393fb4ffb551af281))
* 🎸 (setup) setup and first features ([d1b9821](https://github.com/angular-experts-io/ng-parsel/commit/d1b98212fd11a6488618a52ced3bf879150adb9e))
* 🎸 (spinners) add ora spinners ([66ce80e](https://github.com/angular-experts-io/ng-parsel/commit/66ce80eb3760fc90280443f6699d5e5bfc11f9ab))
* 🎸 (styles) spit out correct styles ([0600494](https://github.com/angular-experts-io/ng-parsel/commit/06004949a8d075c42d94309b4be4c3607aeecb17))
* 🎸 (type) add building block type ([0e88f4d](https://github.com/angular-experts-io/ng-parsel/commit/0e88f4d7408a40c65bc68ecabe26d404533813a0))
