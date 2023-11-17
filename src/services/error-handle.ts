import { store } from '../store';
import { setError } from '../store/slices/error-slice';
import { clearErrorAction } from '../store/api-actions';

export const proccessErrorHandle = (message: string) => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
