import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@type": path.resolve(__dirname, "./src/types"),
			"@interfaces": path.resolve(__dirname, "./src/interfaces"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@controllers": path.resolve(__dirname, "./src/controllers"),
			"@components": path.resolve(__dirname, "./src/ui/components"),
			"@layouts": path.resolve(__dirname, "./src/ui/layouts"),
			"@features": path.resolve(__dirname, "./src/features"),
			"@styles": path.resolve(__dirname, "./src/styles"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@screens": path.resolve(__dirname, "./src/screens"),
			"@theme": path.resolve(__dirname, "./src/ui/theme"),
		},
	},
});
