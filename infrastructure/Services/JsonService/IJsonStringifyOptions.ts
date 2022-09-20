export interface IJsonStringifyOptions {

  /**
   * A String or Number object that's used to insert white space into the output JSON string for readability purposes.
   * 
   * If this is a Number, it indicates the number of space characters to use as white space; 
   * this number is capped at 10 (if it is greater, the value is just 10). Values less than 1 indicate that no space should be used.
   * 
   * If this is a String, the string (or the first 10 characters of the string, 
   * if it's longer than that) is used as white space. If this parameter is not provided (or is null), 
   * no white space is used.
   *
   */
  space?: string | number;

}
