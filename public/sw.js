if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const o=e=>n(e,t),r={module:{uri:t},exports:c,require:o};s[t]=Promise.all(a.map((e=>r[e]||o(e)))).then((e=>(i(...e),c)))}}define(["./workbox-3c9d0171"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/KonoG-0U0a0yM4Kkq_EHC/_buildManifest.js",revision:"5b8e300ea2ba6d4d159a70a1edf3ec2f"},{url:"/_next/static/KonoG-0U0a0yM4Kkq_EHC/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/109038f5-8c3ae495e31b5da5.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/118-a11f975de2ff3674.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/153-b8749c2be17ca7e7.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/242-b78eeb7d7e770502.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/248-b76dfcc85b30c658.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/426-f138a7dded72439d.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/50-0d4a8a66623db96d.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/534-84c9167a455738b7.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/537-2ee459e9848f0d5f.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/634-1e5fa187bb8610de.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/741-92c2f67dc103ac3a.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/743-6a2ca69798cf3103.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/762-72bdd3574f8f456b.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/788.594a346c03ecc563.js",revision:"594a346c03ecc563"},{url:"/_next/static/chunks/789-3e407f5705dc60d0.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/80-21b5c00ee648b91a.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/847-88cd68ec857db45b.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/872-bfc5d5c4c0592ead.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/917-007bccd46cb3158b.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/929-5659d23772851f56.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/937-4d0dbddad7290f06.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/943-23493e2ea92014d0.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/_not-found-7e3f180accea6e74.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/dashboard/page-084b918abd2b2771.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/layout-dcce7360571f2296.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/login/page-58c78721e672256c.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/page-33fec4742e6dbb9f.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/products/page-4f652b21d23ce3bf.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/profile/page-e3d2ad48da8a8d9d.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/settings/address/page-f59a387a149088de.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/settings/bank-account/page-1253d992928eba7a.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/settings/layout-08c3f0c3d75e030c.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/app/settings/page-86faba52b0695f0b.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/cef7bf84-be199eb8aca244a1.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/framework-c99e0eef6309e1fa.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/main-app-1ef7f1f53cb0a54c.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/main-c49e493dd8b8ccf0.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/pages/_app-7aca91455b0e41b8.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/pages/_error-6315bd60976541e2.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f57516e4de33d039.js",revision:"KonoG-0U0a0yM4Kkq_EHC"},{url:"/_next/static/css/3b74799ec06f3fbb.css",revision:"3b74799ec06f3fbb"},{url:"/alert.mp3",revision:"a53360cb103f1b50ab36f3d0bb501f62"},{url:"/icon-192x192.png",revision:"12fd3cc70f6145b29d17cb4d91188ed2"},{url:"/icon-256x256.png",revision:"15589f5acaf4d18ed0f432b909ff12e1"},{url:"/icon-384x384.png",revision:"537d2e4475766608ee553d02aac95129"},{url:"/icon-512x512.png",revision:"6742319cd1bab509ac83498fd08fe365"},{url:"/icons/google.svg",revision:"686f8efa6e3e28e96d1c08399e8d353d"},{url:"/img.avif",revision:"b9c68e8d4fdf1d6507aa3bd1fc02c9cb"},{url:"/manifest.json",revision:"71e96d4aed967503374423936860c111"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
