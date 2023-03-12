import Joi from 'joi'
import { sendSlackNotification } from './notificationService'

/* eslint-disable @typescript-eslint/no-empty-function */
export interface MessagesType {
  RecordType: string
  MessageStream: string
  Tag: string
  Email: string
  From: string
  BouncedAt: string
}

export interface PayloadType {
  Type: string
  TypeCode: number
  Name: string
  Description: string
  OtherMessages: MessagesType
}

class NotificationController {
  handleSlackNotification = async (email: string, messages: string) => {
    const MessageStream = 'outbound'
    const From = 'notifications@honeybadger.io'
    const RecordType = 'Bounce'
    const Tag = messages.length > 0 ? 'TEST' : ''
    const Email = email

    const payload = this.getPayload(Tag, Email, MessageStream, From, RecordType)

    if (payload.OtherMessages.Tag.length === 0) await this.callSlackNotification(payload)
    return payload
  }

  private getPayload = (Tag: string, Email: string, MessageStream: string, From: string, RecordType: string) => {
    let payload: PayloadType
    const OtherMessages: MessagesType = {
      RecordType,
      MessageStream,
      Tag,
      Email,
      From,
      BouncedAt: new Date().toISOString()
    }

    if (Tag.length > 0) {
      payload = {
        OtherMessages,
        Type: 'HardBounce',
        TypeCode: 1,
        Name: 'Hard bounce',
        Description: 'The server was unable to deliver your message (ex: unknown user, mailbox not found).'
      }
    } else {
      payload = {
        OtherMessages,
        Type: 'SpamNotification',
        TypeCode: 512,
        Name: 'Spam notification',
        Description:
          'The message was delivered, but was either blocked by the user, or classified as spam, bulk mail, or had rejected content.'
      }
    }

    return payload
  }

  callSlackNotification = async (payload: PayloadType) => {
    await sendSlackNotification(payload)
  }
}

const notificationController = new NotificationController()

export default notificationController
