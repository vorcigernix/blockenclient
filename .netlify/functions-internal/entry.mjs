import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { s as server_default, g as deserializeManifest } from './chunks/astro.0aa59f2f.mjs';
import { _ as _page0 } from './chunks/pages/all.b702ef4f.mjs';
import 'mime';
import 'cookie';
import 'html-escaper';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'string-width';
/* empty css                                 */import 'webnative';
import 'webnative/components/crypto/implementation/browser';
import 'webnative/fs/v1/PublicFile';
import 'webnative/fs/v1/PublicTree';
import 'webnative/fs/protocol/basic';

const pageMap = new Map([["src/pages/index.astro", _page0],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["_astro/index.42f66b4f.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true,"contentDir":"file:///home/vorcigernix/develop/blockenastro/src/content/"},"pageMap":null,"propagation":[["/home/vorcigernix/develop/blockenastro/src/layouts/Layout.astro","in-tree"],["/home/vorcigernix/develop/blockenastro/src/components/Card.astro","in-tree"],["/home/vorcigernix/develop/blockenastro/src/components/CardList.astro","in-tree"],["/home/vorcigernix/develop/blockenastro/src/pages/index.astro","in-tree"]],"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","astro:scripts/before-hydration.js":""},"assets":["/_astro/index.42f66b4f.css","/favicon.svg"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
