interface BaseStore {
    isFetching: boolean;
    error: Error | null;
    fetch: <Params, Data = any>(params: Params) => Axios.Response<Data>
    _fetchCallback?<T = any>(data: T): void;
}