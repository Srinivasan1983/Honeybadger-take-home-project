import { SlackClient } from './service/slack/client'
import { PayloadType } from './notificationController'
import { baseConfig } from './config'

export const sendSlackNotification = async (payload: PayloadType) => {
  console.log(baseConfig.slack)
  const webClient = new SlackClient({ token: baseConfig.slack.token, channel: baseConfig.slack.channel })
  try {
    await webClient.postMessage(payload)
  } catch (error) {
    console.error(error)
  }
}
