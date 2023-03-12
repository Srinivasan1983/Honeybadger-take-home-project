import type { ChatPostMessageArguments } from '@slack/web-api'

export type PostMessageArguments = Omit<RemoveIndex<ChatPostMessageArguments>, 'channel'>

/**
 * Remove `WebAPICallOptions` index signature from Slack argument types.
 *
 * @see https://stackoverflow.com/a/51956054
 */
type RemoveIndex<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}
