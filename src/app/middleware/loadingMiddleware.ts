// middleware/loadingMiddleware.ts
import type { Middleware } from '@reduxjs/toolkit';
import { setLoading } from '../../features/loading/loadingSlice';

let pendingRequests = 0;

export const loadingMiddleware: Middleware = (store) => (next) => (action) => {
    // Проверяем, что action имеет тип
    if (action && typeof action === 'object' && 'type' in action && typeof action.type === 'string') {
        const { type } = action;

        if (type.endsWith('/pending')) {
            pendingRequests += 1;
            if (pendingRequests === 1) {
                store.dispatch(setLoading(true));
            }
        } else if (type.endsWith('/fulfilled') || type.endsWith('/rejected')) {
            pendingRequests = Math.max(0, pendingRequests - 1);
            if (pendingRequests === 0) {
                store.dispatch(setLoading(false));
            }
        }
    }

    return next(action);
};