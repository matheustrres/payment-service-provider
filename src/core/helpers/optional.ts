/**
 * Make selected properties of an object optional while keeping the rest as they are
 *
 * @typeparam T - The input object type
 * @typeparam K - The keys of the properties to be made optional
 *
 * @example
 * ```typescript
 * type Post = {
 *  id: string;
 *  name: string;
 *  title: string;
 * }
 *
 * Optional<Post, 'id' | 'title'>
 * ```
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
