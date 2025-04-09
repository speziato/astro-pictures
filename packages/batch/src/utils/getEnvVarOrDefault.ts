type TypeName = "boolean" | "string" | "number";
type ReturnType<T extends TypeName> = T extends "boolean"
  ? boolean
  : T extends "string"
    ? string
    : T extends "number"
      ? number
      : never;

const getEnvVarOrDefault = <T extends ReturnType<TypeName>>(
  varName: string,
  defaultValue: T
) => {
  const val = process.env[varName];
  const type = typeof defaultValue as TypeName;
  if (typeof val !== "undefined") {
    if (type === "number") return parseFloat(val) as T;
    else if (type === "boolean") return Boolean(val === "true") as T;
    else if (type === "string") return String(val) as T;
    else throw new Error("Unexpected default value type");
  } else if (type !== "string" && type !== "boolean" && type !== "number")
    throw new Error("Unexpected default value type");
  else return defaultValue as T;
};

export default getEnvVarOrDefault;
