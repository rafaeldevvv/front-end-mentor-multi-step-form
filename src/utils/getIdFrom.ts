export default function getIdFrom(
  string: string,
  separator = "-",
  prefix = "",
  suffix = "",
) {
  // replaces non-word characters with separator
  let id = string.replace(/\W/g, separator); 
  // replaces sequences of separators with one separator
  id = id.replace(new RegExp(`\\${separator}{2,}`, "g"), separator); 
  id = prefix + id;
  id += suffix;
  return id;
}
