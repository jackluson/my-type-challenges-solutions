type IsAny<T> = boolean extends (T extends string ? true : false) ? true : false;

export default IsAny;