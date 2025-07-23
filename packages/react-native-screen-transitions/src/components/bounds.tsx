import { useCallback } from "react";
import type { View } from "react-native";
import Animated, {
	measure,
	runOnUI,
	useAnimatedRef,
} from "react-native-reanimated";
import { useKey } from "@/hooks/use-key";
import { BoundsStore } from "../store/animation-store";

export const Bounds = ({
	sharedId,
	children,
}: {
	sharedId: string;
	children: React.ReactNode;
}) => {
	const ref = useAnimatedRef<View>();
	const key = useKey();

	const onLayout = useCallback(() => {
		runOnUI(() => {
			const m = measure(ref);
			if (!m) return;

			BoundsStore.setGlobalElementBounds(key, sharedId, m);
		})();
	}, [ref, key, sharedId]);

	return (
		<Animated.View ref={ref} onLayout={onLayout}>
			{children}
		</Animated.View>
	);
};
