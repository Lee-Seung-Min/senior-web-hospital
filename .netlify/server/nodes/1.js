

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7a87a03e.js","_app/immutable/chunks/index.d5a12835.js","_app/immutable/chunks/stores.507029a4.js","_app/immutable/chunks/singletons.9a8df68d.js","_app/immutable/chunks/paths.89d88102.js"];
export const stylesheets = [];
export const fonts = [];
