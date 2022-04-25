type BuildArray<
  Len extends number,
  V extends unknown[] = []
> = V['length'] extends Len ? V : BuildArray<Len, [...V, unknown]>;

export type Add<A extends number, B extends number> = [
  ...BuildArray<A>,
  ...BuildArray<B>
]['length'];
