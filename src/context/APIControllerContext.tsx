import { createContext, useContext } from "react";
import type { APIController } from "@controllers/api-controller";

export const APIControllerContext = createContext<APIController | null>(null);

export const useAPIController = () => {
	const ctx = useContext(APIControllerContext);
	if (!ctx) {
		throw new Error("APIController not available (missing API keys?)");
	}
	return ctx;
};
