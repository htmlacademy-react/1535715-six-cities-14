import { errorSlice, setError } from './error-slice';

describe('Error slice testing', () => {
  const initialState = {
    error: null as null | string,
  };

  it('set error message', () => {
    const errorMessage = 'Some error message';

    const result = errorSlice.reducer(initialState, setError(errorMessage));

    expect(result.error).toBe(errorMessage);
  });

  it('set error message to null', () => {
    const result = errorSlice.reducer(initialState, setError(null));

    expect(result.error).toBeNull();
  });
});
