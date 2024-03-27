interface IQueryConfig {
    range : {start : number | string, stop : number | 'now'}
    filter? : {key : string, value : number | string}[]
}