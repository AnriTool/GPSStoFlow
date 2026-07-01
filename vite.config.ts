// @ts-ignore
import { defineConfig } from 'vite'

// @ts-ignore
export default defineConfig({
	// root: 'src',
	server: {
		port: 3000,
		open: true // Автоматически открывать браузер
	},
	base: './',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		sourcemap: true,
		assetsInlineLimit: 4096 * 10,
	},
	assetsInclude: ['**/*.png'],
	plugins: [
		// viteStaticCopy({
		// 	targets: [
		// 		{
		// 			src:'assets/audio/*',
		// 			dest:'assets/audio/'
		// 		}
		// 	]
		// })
	]
})