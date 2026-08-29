/**
 * TypeScript declarations for ESLint modules without type definitions
 *
 * Remove when these modules provide proper @types packages or built-in types.
 */

declare module 'eslint-restricted-globals' {
  const restrictedGlobals: readonly string[];
  export = restrictedGlobals;
}

declare module 'eslint-plugin-sort-destructure-keys' {
  interface ESLintPlugin {
    rules: Record<string, unknown>;
    configs?: Record<string, unknown>;
    processors?: Record<string, unknown>;
  }
  const plugin: ESLintPlugin;
  export = plugin;
}

declare module 'eslint-plugin-sort-keys-fix' {
  interface ESLintPlugin {
    rules: Record<string, unknown>;
    configs?: Record<string, unknown>;
    processors?: Record<string, unknown>;
  }
  const plugin: ESLintPlugin;
  export = plugin;
}
