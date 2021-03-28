declare function escapeGroup(group: string): string;
declare function escapeGroup(group: string): string;
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
declare function escapeGroup(group: string): string;
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
declare function escapeGroup(group: string): string;
declare function attachKeys(re: RegExp, keys: any[]): RegExp;
declare function attachKeys(re: RegExp, keys: any[]): RegExp;
/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
declare function attachKeys(re: RegExp, keys: any[]): RegExp;
/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
declare function attachKeys(re: RegExp, keys: any[]): RegExp;
declare function flags(options: Object): string;
declare function flags(options: Object): string;
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
declare function flags(options: Object): string;
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
declare function flags(options: Object): string;
declare function regexpToRegexp(path: RegExp, keys: any[]): RegExp;
declare function regexpToRegexp(path: RegExp, keys: any[]): RegExp;
/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
declare function regexpToRegexp(path: RegExp, keys: any[]): RegExp;
/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
declare function regexpToRegexp(path: RegExp, keys: any[]): RegExp;
declare function arrayToRegexp(path: any[], keys: any[], options: Object): RegExp;
declare function arrayToRegexp(path: any[], keys: any[], options: Object): RegExp;
/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
declare function arrayToRegexp(path: any[], keys: any[], options: Object): RegExp;
/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
declare function arrayToRegexp(path: any[], keys: any[], options: Object): RegExp;
declare function replacePath(path: string, keys: any[]): string;
declare function replacePath(path: string, keys: any[]): string;
/**
 * Replace the specific tags with regexp strings.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @return {String}
 */
declare function replacePath(path: string, keys: any[]): string;
/**
 * Replace the specific tags with regexp strings.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @return {String}
 */
declare function replacePath(path: string, keys: any[]): string;
declare function pathToRegexp(path: string | RegExp | any[], keys?: any[] | undefined, options?: Object | undefined): RegExp;
declare function pathToRegexp(path: string | RegExp | any[], keys?: any[] | undefined, options?: Object | undefined): RegExp;
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
declare function pathToRegexp(path: string | RegExp | any[], keys?: any[] | undefined, options?: Object | undefined): RegExp;
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
declare function pathToRegexp(path: (string | RegExp | any[]), keys?: any[] | undefined, options?: Object | undefined): RegExp;
declare var isArray: (arg: any) => arg is any[];
/**
 * Expose `pathToRegexp`.
 */
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
declare var PATH_REGEXP: RegExp;
//# sourceMappingURL=index.d.ts.map