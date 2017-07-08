/**
 * Configuration for head elements added during the creation of index.html.
 *
 * All href attributes are added the publicPath (if exists) by default.
 * You can explicitly hint to prefix a publicPath by setting a boolean value to a key that has
 * the same name as the attribute you want to operate on, but prefix with =
 *
 * Example:
 * { name: 'msapplication-TileImage', content: '/assets/icon/ms-icon-144x144.png', '=content': true },
 * Will prefix the publicPath to content.
 *
 * { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/apple-icon-57x57.png', '=href': false },
 * Will not prefix the publicPath on href (href attributes are added by default
 *
 */

module.exports = {
    meta: [
        {charset : "utf-8"},
        {'http-equiv' : "x-ua-compatible", content : "ie=edge" },
        {name: 'viewport', content: 'width=device-width, initial-scale=1'}/*,
        {name: 'robots', content: 'noindex'}*/
    ],
    link: [
        /** <link> tags for 'apple-touch-icon' (AKA Web Clips). **/
        {rel: 'shortcut icon', type: 'image/x-icon', href: '/assets/favicon.ico'},
        {rel: 'icon', type: 'image/x-icon', href: '/assets/favicon.ico'},
        {rel: 'stylesheet', href: '/assets/styles.css?v='+new Date().getTime()}
    ]
}

/*{rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/apple-icon-57x57.png'},
 {rel: 'apple-touch-icon', sizes: '60x60', href: '/assets/icon/apple-icon-60x60.png'},
 {rel: 'apple-touch-icon', sizes: '72x72', href: '/assets/icon/apple-icon-72x72.png'},
 {rel: 'apple-touch-icon', sizes: '76x76', href: '/assets/icon/apple-icon-76x76.png'},
 {rel: 'apple-touch-icon', sizes: '114x114', href: '/assets/icon/apple-icon-114x114.png'},
 {rel: 'apple-touch-icon', sizes: '120x120', href: '/assets/icon/apple-icon-120x120.png'},
 {rel: 'apple-touch-icon', sizes: '144x144', href: '/assets/icon/apple-icon-144x144.png'},
 {rel: 'apple-touch-icon', sizes: '152x152', href: '/assets/icon/apple-icon-152x152.png'},
 {rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/icon/apple-icon-180x180.png'},
 /!** <link> tags for android web app icons **!/
 {rel: 'icon', type: 'image/png', sizes: '192x192', href: '/assets/icon/android-icon-192x192.png'},
 /!** <link> tags for favicons **!/
 {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/icon/favicon-32x32.png'},
 {rel: 'icon', type: 'image/png', sizes: '96x96', href: '/assets/icon/favicon-96x96.png'},
 {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/icon/favicon-16x16.png'},*/
/** <link> tags for a Web App Manifest **/
/*{rel: 'manifest', href: '/assets/manifest.json'},*/

/*
<meta name="theme-color" content="#0081c9">
*/

/*
{name: 'og:title', content: 'Fincash'},
{name: 'og:url', content: 'https://www.fincash.com', '=content': true},
{name: 'og:image', content: 'https://www.fincash.com'},
{name: 'og:description', content: 'fincash description'},
{name: 'og:locale', content: 'en_US'}
*/

/*
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
*/
