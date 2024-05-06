export class Tools {
  static Union(objects: any[]) {
    let obj = {};
    objects.forEach((e) => {
      Object.keys(e).forEach((i) => {
        obj[i] = e[i];
      });
    });
    return obj;
  }

  static GroupBy(propName: string, objects: any[]) {
    let obj = {};
    const targetValue = new Set(objects.map((e) => e[propName]));
    targetValue.forEach((k) => {
      obj[k] = this.Union(objects.filter((e) => e[propName] == k));
    });
    return obj;
  }

  static GroupByAsList(propName: string, objects: any[]) {
    let obj = [];
    const targetValue = new Set(objects.map((e) => e[propName]));
    targetValue.forEach((k) => {
      obj.push(this.Union(objects.filter((e) => e[propName] == k)));
    });
    return obj;
  }

  static GroupByUsingProps(rootPropName : string, propName, objects : any[]) {
    let obj = {};
    objects.forEach((e) => {
      let k = Object.keys(obj);
      let i = k.indexOf(e[rootPropName]);
      if(i == -1){
        obj[e[rootPropName]] = {};
        obj[e[rootPropName]][e[propName]] = e;
      }
      else {
        obj[k[i]][e[propName]] = e;
      }
    })
    return obj;
  }
}