import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import Transition, {
	useScreenAnimation,
} from "react-native-screen-transitions";
import { BottomNav } from "@/components/bottom-nav";
import MainExample from "@/components/main-example";
import MocksExample from "@/components/mocks-example";

const TransitionScrollView =
	Transition.createTransitionAwareComponent(ScrollView);

export default function Home() {
	const [activeSegment, setActiveSegment] = useState(0);

	const { current } = useScreenAnimation();

	useDerivedValue(() => {
		console.log(current.bounds.value);
	});

	return (
		<View
			style={{
				backgroundColor: "white",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Transition.Bounds sharedId="shared">
				<View style={{ width: 100, height: 100, backgroundColor: "red" }} />
			</Transition.Bounds>
			<Transition.Bounds sharedId="cock">
				<View style={{ width: 100, height: 100, backgroundColor: "blue" }} />
			</Transition.Bounds>
			<TransitionScrollView
				contentContainerStyle={{
					paddingVertical: 100,
					gap: 32,
				}}
			>
				{activeSegment === 0 ? <MainExample /> : <MocksExample />}
			</TransitionScrollView>
			<BottomNav
				activeSegment={activeSegment}
				setActiveSegment={setActiveSegment}
			/>
		</View>
	);
}
