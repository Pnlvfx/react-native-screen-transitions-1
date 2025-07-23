import { createContext, useContext } from "react";
import type { GestureType } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";

export type ScrollProgress = {
	x: number;
	y: number;
	contentHeight: number;
	contentWidth: number;
	layoutHeight: number;
	layoutWidth: number;
};

export interface GestureContextType {
	panGesture: GestureType;
	nativeGesture: GestureType;
	scrollProgress: SharedValue<ScrollProgress>;
	isPlaceholder?: boolean;
}

export const GestureContext = createContext<GestureContextType | undefined>(
	undefined,
);

export const useGestureContext = () => {
	const context = useContext(GestureContext);

	if (!context) {
		throw new Error(
			"useGestureContext must be used within a TransitionAwareWrapper",
		);
	}

	return context;
};
