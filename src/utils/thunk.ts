import { ApiResponse } from '@type/api/api';

export function withToastForError<Args, Returned extends ApiResponse>(
  payloadCreator: (args: Args) => Promise<Returned>,
) {
  return async (args: Args, { rejectWithValue }: any) => {
    try {
      const response: Returned = await payloadCreator(args);
      if (!response.status) {
        return rejectWithValue(response.message);
      }
      return response;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  };
}
