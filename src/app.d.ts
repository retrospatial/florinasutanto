// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '*.yaml' {
	const content: any;
	export default content;
}

declare module 'markdown-it-bracketed-spans';
declare module 'markdown-it-attrs';
declare module 'markdown-it-task-lists';

export {};
