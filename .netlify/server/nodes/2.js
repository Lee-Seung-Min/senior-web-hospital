

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.ec6edbb1.js","_app/immutable/chunks/index.d5a12835.js","_app/immutable/chunks/navigation.acd09e3d.js","_app/immutable/chunks/singletons.9a8df68d.js","_app/immutable/chunks/paths.89d88102.js","_app/immutable/chunks/URL.a9e29d8e.js"];
export const stylesheets = [];
export const fonts = [];
