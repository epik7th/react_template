import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), svgr()],
	envDir: resolve(__dirname, './'),
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	build: {
		// sourcemap: true,
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
			sourceMap: true,
			format: {
				comments: false,
			},
		},
		rollupOptions: {
			output: {
				// manualChunks(id) {
				// 	if (id.includes('node_modules')) {
				// 		return id.toString().split('node_modules/')[1].split('/')[0].toString().replace('@', 'dog_')
				// 	}
				// },
				// sourcemap: true,
			},
			plugins: [],
		},
	},
})
