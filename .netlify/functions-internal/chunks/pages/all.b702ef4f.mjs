/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot, m as maybeRenderHead, f as renderComponent } from '../astro.0aa59f2f.mjs';
import 'html-escaper';
import * as wn from 'webnative';
import * as BrowserCrypto from 'webnative/components/crypto/implementation/browser';
import { PublicFile } from 'webnative/fs/v1/PublicFile';
import { PublicTree } from 'webnative/fs/v1/PublicTree';
import { getSimpleLinks } from 'webnative/fs/protocol/basic';

const $$Astro$3 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<meta name="generator"${addAttribute(Astro2.generator, "content")}>
		<title>${title}</title>
	${renderHead($$result)}</head>
	<body>
		${renderSlot($$result, $$slots["default"])}
	</body></html>`;
}, "/home/vorcigernix/develop/blockenastro/src/layouts/Layout.astro");

async function lookup(token) {
  const config = {
    namespace: { creator: "Blockenberg", name: "BBG" },
    debug: true,
  };

  // Components
  const crypto = createCryptoComponent();
  const depot = createDepotComponent();
  const storage = wn.storage.memory();

  const fissionComponents = await wn.compositions.fission({
    ...config,
    crypto,
    storage,
  });

  const componentsWithCustomDepot = {
    ...fissionComponents,
    depot,
  };

  // Create program
  const program = await wn.assemble(
    config,
    componentsWithCustomDepot,
  );

  const { reference } = program.components;
  const cid = await reference.dataRoot.lookup(token);

  const publicCid = (await getSimpleLinks(depot, cid)).public.cid;
  const publicTree = await PublicTree.fromCID(depot, reference, publicCid);
  //console.log(publicTree);

  const doclinks = Object.values(
    await publicTree.ls(
      wn.path.unwrap(wn.path.directory("documents")),
    ),
  );

  const piclinks = Object.values(
    await publicTree.ls(
      wn.path.unwrap(wn.path.directory("gallery")),
    ),
  );

  //console.log(piclinks);

  // Return docs
  return await Promise.all(
    doclinks.map(async (doc) => {
      const file = await PublicFile.fromCID(depot, doc.cid);
      //console.log(file);
      const filecontent = new TextDecoder().decode(file.content);
      const updated = file.header.metadata.unixMeta.mtime;
      const filecontentjson = JSON.parse(filecontent);
      const imagejson = JSON.parse(filecontentjson.image);
      const imagecid = piclinks.find((pic) => pic.name === imagejson.name);
      //console.log(String(imagecid.cid).replace(/[CID\(\)]/g,""));
      const image = `https://ipfs.runfission.com/ipfs/${String(imagecid.cid).replace(/[CID\(\)]/g,"")}/userland`;
      return { post: filecontentjson, image: image, updated: updated };    }),
  );
}

// Node.js Components

function boom() {
  throw new Error("Method not implemented");
}

function createCryptoComponent() {
  const {
    aes,
    did,
    hash,
    misc,
    rsa,
  } = BrowserCrypto;

  return {
    aes,
    did,
    hash,
    misc,
    rsa,

    // We're avoiding having to implement all of this,
    // because we're not using it anyway.
    // ---
    // One way to actually implement this would be to
    // set up the keystore-idb library to use an in-memory
    // store instead of indexedDB. There's an example in
    // the Webnative tests.
    keystore: {
      clearStore: boom,
      decrypt: boom,
      exportSymmKey: boom,
      getAlgorithm: boom,
      getUcanAlgorithm: boom,
      importSymmKey: boom,
      keyExists: boom,
      publicExchangeKey: boom,
      publicWriteKey: boom,
      sign: boom,
    },
  };
}

function createDepotComponent() {
  const ipfsGateway = `https://ipfs.runfission.com`;

  function ipfs(path) {
    return fetch(`${ipfsGateway}${path}`)
      .then((r) => r.arrayBuffer())
      .then((r) => new Uint8Array(r));
  }

  return {
    // Get the data behind a CID
    getBlock: async (cid) => {
      return ipfs(`/api/v0/block/get?arg=${cid.toString()}`);
    },
    getUnixFile: async (cid) => {
      return ipfs(`/api/v0/cat?arg=${cid.toString()}`);
    },

    // We're avoiding having to implement all of this,
    // because we're not using it anyway.
    getUnixDirectory: boom,
    putBlock: boom,
    putChunked: boom,
    size: boom,
  };
}

const $$Astro$2 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Card;
  const { doc, i } = Astro2.props;
  const id = `cardid${i}`;
  const updated = new Date(doc.updated).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col w-full justify-start items-center">
	<button${addAttribute(id, "id")} class="group hover:no-underline focus:no-underline dark:dark:bg-zinc-900 max-w-sm">
		<img role="presentation" class="object-cover w-full dark:dark:bg-gray-500 h-44"${addAttribute(doc.image, "src")}>
		<div class="p-6 space-y-2">
			<h3 class="text-2xl font-bold group-hover:underline group-focus:underline text-ellipsis overflow-hidden truncate">
				${doc.post.header}
			</h3>
			<span class="text-xs dark:dark:text-gray-400">${updated}</span>
			<p class="h-60 overflow-hidden">${doc.post.content}</p>
		</div>
	</button>
</div>`;
}, "/home/vorcigernix/develop/blockenastro/src/components/Card.astro");

const $$Astro$1 = createAstro();
const $$CardList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CardList;
  const { token } = Astro2.props;
  const documents = await lookup(token);
  return renderTemplate`${documents.map((doc, i) => renderTemplate`${renderComponent($$result, "Card", $$Card, { "doc": doc, "i": i })}`)}`;
}, "/home/vorcigernix/develop/blockenastro/src/components/CardList.astro");

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Blockenberg Astro sample client." }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main>
		<section>
			<div class="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
				<div class="block max-w-sm gap-3 mx-auto sm:max-w-full lg:grid lg:grid-cols-12 dark:dark:bg-zinc-900">
					<img src="https://images.unsplash.com/photo-1590492123569-42905d752c86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80" alt="" class="object-cover w-full h-64 grayscale hover:grayscale-0 transition duration-700 sm:h-96 lg:col-span-7 dark:dark:bg-gray-500">
					<div class="p-6 lg:col-span-5 text-left">
						<h3 class="text-2xl my-4 font-semibold sm:text-4xl group-hover:underline group-focus:underline">
							The Gray Zone
						</h3>
						<span class="text-xs dark:dark:text-gray-400">
							Since February 2023
						</span>
						<p class="mt-2">
							“When a man is denied the right to live the life he believes in,
							he has no choice but to become an outlaw.”
						</p>
						<p class="mt-4">Nelson Mandela</p>
					</div>
				</div>
				<div class="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					${renderComponent($$result2, "CardList", $$CardList, { "token": "mmkooe7pj6p6avi66mwq5n63muuwjyfm" })}
				</div>
			</div>
		</section>
	</main>` })}`;
}, "/home/vorcigernix/develop/blockenastro/src/pages/index.astro");

const $$file = "/home/vorcigernix/develop/blockenastro/src/pages/index.astro";
const $$url = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _ };
