import { makeMutable, type SharedValue } from "react-native-reanimated";

type StateUpdater<T> = (state: T) => T | void;

export interface WorkletStoreApi<T> {
	setState: (updater: StateUpdater<T>) => void;
	getState: () => T;
	sharedValue: SharedValue<T>;
}

function deepClone<T>(obj: T): T {
	"worklet";
	if (obj === null || typeof obj !== "object") {
		return obj;
	}

	if (obj instanceof Date) {
		return new Date(obj.getTime()) as T;
	}

	if (Array.isArray(obj)) {
		return obj.map((item) => deepClone(item)) as T;
	}

	if (typeof obj === "object") {
		const cloned = {} as T;
		for (const key in obj) {
			// biome-ignore lint/suspicious/noPrototypeBuiltins: <Typescript issue>
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				cloned[key] = deepClone(obj[key]);
			}
		}
		return cloned;
	}

	return obj;
}

export function createWorkletStore<TState>(initialState: TState) {
	const sharedState = makeMutable<TState>(initialState);

	const getState = (): TState => {
		"worklet";
		return sharedState.value;
	};

	const setState = (updater: StateUpdater<TState>) => {
		"worklet";
		const currentState = sharedState.value;
		const clonedState = deepClone(currentState);

		const nextState: TState = updater(clonedState) ?? clonedState;

		sharedState.value = nextState;
	};

	const store = {
		setState,
		getState,
		sharedValue: sharedState,
	};

	return store;
}
