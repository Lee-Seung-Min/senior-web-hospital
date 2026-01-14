

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/awLogin/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/20.dcfb709c.js","_app/immutable/chunks/index.d5a12835.js","_app/immutable/chunks/navigation.acd09e3d.js","_app/immutable/chunks/singletons.9a8df68d.js","_app/immutable/chunks/paths.89d88102.js","_app/immutable/chunks/URL.a9e29d8e.js","_app/immutable/chunks/loginStore.3d608c98.js","_app/immutable/chunks/index.c4ca6160.js","_app/immutable/chunks/urlAddr.8df1f73c.js","_app/immutable/chunks/navStore.cd9e8351.js","_app/immutable/chunks/gridjs.module.a5d504de.js","_app/immutable/chunks/plugins.79b73da5.js"];
export const stylesheets = ["_app/immutable/assets/20.4c06b451.css"];
export const fonts = [];
