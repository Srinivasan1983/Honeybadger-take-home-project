import { WebClient } from '@slack/web-api'
import { PayloadType } from '../../notificationController'

interface Dependencies {
  token: string
  channel: string
}

export class SlackClient {
  private readonly web: WebClient
  private readonly channel: string

  constructor({ token, channel }: Dependencies) {
    this.web = new WebClient(token)
    this.channel = channel
  }

  /**
   * @returns message timestamp ID
   */
  async postMessage(payload: PayloadType): Promise<string> {
    const { ts } = await this.web.chat.postMessage({
      text: `Report Spam by - ${payload.OtherMessages.Email}`,
      channel: this.channel
    })

    if (!ts) {
      throw new Error('Response timestamp ID undefined')
    }

    return ts
  }
}
