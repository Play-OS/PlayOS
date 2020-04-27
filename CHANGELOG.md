# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/FranklinWaller/PlayOS/compare/v1.8.0...v2.0.0) (2020-04-27)


### Features

* **build:** Use stricter create-react-app ([f725074](https://github.com/FranklinWaller/PlayOS/commit/f7250743ee6d66928e00acfb18e94e2f6291f9de))
* **core:** Created a separate simplyfied kernel ([5f90a74](https://github.com/FranklinWaller/PlayOS/commit/5f90a7463cf75e882d3b86155eab04c332cc5cd1))
* **dependencies:** Use @playos/kernel instead of internal kernel ([8e7961e](https://github.com/FranklinWaller/PlayOS/commit/8e7961e1df033340e0543b3263df8664295cd997))
* **explorer:** .wapp files are now folders ([9a58b5c](https://github.com/FranklinWaller/PlayOS/commit/9a58b5c4955ff6c89055a81d4436697c5ce3a0e7))
* **explorer:** Add support for uploading files ([e8bd7c1](https://github.com/FranklinWaller/PlayOS/commit/e8bd7c1eb7fc944a2aaad72ee45d4977eb311f04))
* **explorer:** Load icons and names from .wapp files ([30dbd4a](https://github.com/FranklinWaller/PlayOS/commit/30dbd4af4816d77b6443ad2775e545dd93f2a24b))
* **explorer:** Removed shadows in header ([6971ec4](https://github.com/FranklinWaller/PlayOS/commit/6971ec424789143fca0d4629b2958156b6fd5b33))
* **explorer:** Use title bar as bread crumbs for current working directory ([66f0266](https://github.com/FranklinWaller/PlayOS/commit/66f026666ebf55d4785af8ff066cc66c507bd84d))
* **general:** Applications will now be loaded from /Applications ([75d3f15](https://github.com/FranklinWaller/PlayOS/commit/75d3f1597c238991a0504ba84b182b14192c12b3))
* **header:** Changed header styles ([e51a2c6](https://github.com/FranklinWaller/PlayOS/commit/e51a2c60f37d02d1059ba8ca4d2cbeb1eea77092))
* **kernel:** Updated kernel to use sepearet fs and process workers ([468124d](https://github.com/FranklinWaller/PlayOS/commit/468124dd717a5db15aa8aba3cbd66a5c8d1f6cf3))
* **provider:** Add suppor for native filesystem ([29f8dc9](https://github.com/FranklinWaller/PlayOS/commit/29f8dc97f644d28d24a5fcf49eec87c8c44df5d2))
* **pwa:** Add minimum to be installable ([f31a811](https://github.com/FranklinWaller/PlayOS/commit/f31a8112fef244b9eb745e51fd8f61173044a15a))
* **sidebar:** Add about PlayOS menu option ([1db31e9](https://github.com/FranklinWaller/PlayOS/commit/1db31e99680bb29057f70b541e7354504dd17194))
* **wallpaper:** Add transition for wallpaper ([3e26bc1](https://github.com/FranklinWaller/PlayOS/commit/3e26bc16a8b5e47c522376483f85ec395bc94141))


### Bug Fixes

* **about:** Fix issue where logo was not appearing on the about page ([69b15bf](https://github.com/FranklinWaller/PlayOS/commit/69b15bfd234bc464c399ffb252cc9c59485af116))
* **browser:** Fix issue where browsers where unable to boot ([8edeae1](https://github.com/FranklinWaller/PlayOS/commit/8edeae1af0d1a6232090fa2cbab3c3456b5cbfe5))
* **eslint:** Fix some eslint issues ([5142aa3](https://github.com/FranklinWaller/PlayOS/commit/5142aa30651699e44f3a979dc103883783929e90))
* **Explorer:** Fix issue with sizing of folders and files ([8650f44](https://github.com/FranklinWaller/PlayOS/commit/8650f442572b8992089ec0ad16cb2475361cca4d))
* **html:** Fix issue where firefox would throw a charset error ([bc58e1a](https://github.com/FranklinWaller/PlayOS/commit/bc58e1a0ff952e42ac6ef05e00f6dc60d8b24a94))
* **worker:** Fix issue where workers would not load ([2c3de2d](https://github.com/FranklinWaller/PlayOS/commit/2c3de2dfd4da75ab9be8281d1be8480f102f84ba))

## 1.8.0 (2019-10-31)


### Features

* **app:** Add application installation ([479bd31](https://github.com/Rutile-io/PlayOS/commit/479bd3168f28b4f885ab624c21b7ce0bd2bdc475))
* **app:** Add support for WASI enabled WASM apps ([81cff64](https://github.com/Rutile-io/PlayOS/commit/81cff64ff568a0af7c579ca420f5b15d30e3ed40))
* **build:** Moved to parcel ([b3e2db8](https://github.com/Rutile-io/PlayOS/commit/b3e2db882249a10556e5063765f369bfad2da10e))
* **dashboard:** Add support for applications ([4a4bafd](https://github.com/Rutile-io/PlayOS/commit/4a4bafdbfa45e3fd60a59b3b82b0d99c31c42f51))
* **dashboard:** Add Terminal and Wallet ([e22fccb](https://github.com/Rutile-io/PlayOS/commit/e22fccbecccebb59bb3965a9e33099653cdd05eb))
* **explorer:** Added support for file exploring ([96ec755](https://github.com/Rutile-io/PlayOS/commit/96ec75538af3e46541155b0a9be2f9a8a841aa11))
* **main:** Add window management and process management ([3482a24](https://github.com/Rutile-io/PlayOS/commit/3482a24baddb5bf61c04efe8ca6202b6f51f52a3))
* **terminal:** Add support for running applications inside the filesystem ([f6e8fef](https://github.com/Rutile-io/PlayOS/commit/f6e8fefc25a9c693a560d7b61afd69698a7db3ac))
* **WindowManager:** Add ability to theme the app window with manifest.json ([25f252b](https://github.com/Rutile-io/PlayOS/commit/25f252b0e5826d817882759fca4f7af114140d2e))

<a name="1.7.0"></a>
# [1.7.0](https://bitbucket.org/Franklin_Waller/playos-authentication/compare/v1.6.0...v1.7.0) (2018-09-28)


### Features

* **legal:** Add terms of use to register checkbox ([11d1cd1](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/11d1cd1))



<a name="1.6.0"></a>
# [1.6.0](https://bitbucket.org/Franklin_Waller/playos-authentication/compare/v1.5.0...v1.6.0) (2018-09-06)


### Bug Fixes

* **ux:** Fix issue where users would not get feedback when checking codes ([fd8c20b](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/fd8c20b))


### Features

* **legal:** Add privacy policy checkbox to register page ([f00a5a2](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/f00a5a2))



<a name="1.5.0"></a>
# [1.5.0](https://bitbucket.org/Franklin_Waller/playos-authentication/compare/v1.4.0...v1.5.0) (2018-07-14)


### Features

* **register:** Add security feature where a user must first insert a code to continue ([04f021f](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/04f021f))



<a name="1.4.0"></a>
# [1.4.0](https://bitbucket.org/Franklin_Waller/playos-authentication/compare/v1.3.1...v1.4.0) (2018-04-14)


### Features

* **build:** Switched to using webpack ([0008dae](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/0008dae))
* **login:** Add remember me functionality ([1ebb043](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/1ebb043))



<a name="1.3.1"></a>
## [1.3.1](https://bitbucket.org/Franklin_Waller/playos-authentication/compare/v1.3.0...v1.3.1) (2018-01-12)


### Features

* **config:** Add option to set environment to root ([1fe51db](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/1fe51db))



<a name="1.3.0"></a>
# [1.3.0](https://bitbucket.org/Franklin_Waller/playos-authentication/compare/v1.1.1...v1.3.0) (2017-11-06)


### Features

* **ga:** Add GA tracking ([4e3bb71](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/4e3bb71))
* **oauth2:** Implement OAuth2 login ([0c7265b](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/0c7265b))
* **styling:** Add paper to the login/register box ([516fe4e](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/516fe4e))



<a name="1.2.0"></a>
# [1.2.0](https://bitbucket.org/Franklin_Waller/playos-authentication/compare/v1.1.1...v1.2.0) (2017-09-22)


### Features

* **styling:** Add paper to the login/register box ([516fe4e](https://bitbucket.org/Franklin_Waller/playos-authentication/commits/516fe4e))
