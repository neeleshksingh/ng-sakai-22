import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface NCoreState {
    activeModule: string;
    loading: boolean;
    notifications: number;
}

const initialState: NCoreState = {
    activeModule: 'Dashboard',
    loading: false,
    notifications: 2
};

export const NCoreStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setActiveModule(activeModule: string): void {
            patchState(store, { activeModule });
        },
        setLoading(loading: boolean): void {
            patchState(store, { loading });
        },
        clearNotifications(): void {
            patchState(store, { notifications: 0 });
        }
    }))
);
