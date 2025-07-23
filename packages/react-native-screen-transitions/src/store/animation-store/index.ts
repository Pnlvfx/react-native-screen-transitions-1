import type { MeasuredDimensions, SharedValue } from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";
import { createWorkletStore } from "../utils/create-worklet-store";

// State structure for bounds store
type BoundsState = {
	bounds: Record<string, Record<string, MeasuredDimensions>>;
};

const boundsStore = createWorkletStore<BoundsState>({
	bounds: {},
});

export const BoundsStore = {
	// Direct access to the store
	...boundsStore,

	getAllBoundsForScreenShared: (
		key: string,
	): SharedValue<Record<string, MeasuredDimensions>> => {
		return useDerivedValue(() => {
			const state = boundsStore.sharedValue.value;
			return state.bounds[key] || {};
		});
	},

	setGlobalElementBounds: (
		key: string,
		sharedId: string,
		bounds: MeasuredDimensions,
	) => {
		"worklet";
		console.log("Setting bounds in store:", key, sharedId, bounds);
		boundsStore.setState((state) => {
			// Ensure the screen key exists
			if (!state.bounds[key]) {
				state.bounds[key] = {};
			}
			// Set the bounds for the shared element
			state.bounds[key][sharedId] = bounds;
			return state;
		});
	},
};
