
export default interface FailureResponse<T = Record<string, string> | string> {
  message: string;
  code: string;
  errors: T;
  timestamp: string;
}