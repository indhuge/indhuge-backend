export class IQueryConfig {
    range : {start : number | string, stop : number | 'now'}
    filter? : {key : string, value : number | string}[]
    group? : string[]
    postGroupBy? : string
}

export const filterByDeviceId = (deviceId : string) => {
  return {
    key: '_measurement',
    value: deviceId,
  };
};

export const filterGetAllMetrics = () => {
    return {
      key: 'data_type',
      value: 'device_metric',
    };
}
