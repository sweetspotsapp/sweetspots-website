import { create } from 'zustand';

type SwipedPlacesState = {
    swipedPlaceIds: string[];
    addSwipedPlaceId: (id: string) => void;
    removeSwipedPlaceId: (id: string) => void;
    clearSwipedPlaceIds: () => void;
    setSwipedPlaceIds: (ids: string[]) => void;
};

export const useSwipedPlaces = create<SwipedPlacesState>((set) => ({
    swipedPlaceIds: [],
    addSwipedPlaceId: (id) =>
        set((state) => ({
            swipedPlaceIds: [...state.swipedPlaceIds, id],
        })),
    removeSwipedPlaceId: (id) =>
        set((state) => ({
            swipedPlaceIds: state.swipedPlaceIds.filter((placeId) => placeId !== id),
        })),
    clearSwipedPlaceIds: () =>
        set(() => ({
            swipedPlaceIds: [],
        })),
    setSwipedPlaceIds: (ids) =>
        set(() => ({
            swipedPlaceIds: ids,
        })),
}));