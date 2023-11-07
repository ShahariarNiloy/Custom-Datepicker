declare const opaque: unique symbol;
type Opaque<T, OpaqueName> = T & { readonly [opaque]: OpaqueName };

export type Timestamp = Opaque<number, "Timestamp">;
