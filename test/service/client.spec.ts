import { createStubInstance, SinonStubbedInstance } from 'sinon'
import { SlackClient } from '../../src/service/slack/client'
import { PayloadType } from '../../src/notificationController'
import { expect } from 'chai'

const spamPayload: PayloadType = {
  OtherMessages: {
    RecordType: 'Bounce',
    MessageStream: 'outbound',
    Tag: '',
    Email: 'zaphod@example.com',
    From: 'notifications@honeybadger.io',
    BouncedAt: new Date().toISOString()
  },
  Type: 'SpamNotification',
  TypeCode: 512,
  Name: 'Spam notification',
  Description:
    'The message was delivered, but was either blocked by the user, or classified as spam, bulk mail, or had rejected content.'
}

const normalPayload: PayloadType = {
  OtherMessages: {
    RecordType: 'Bounce',
    MessageStream: 'outbound',
    Tag: 'TEST',
    Email: 'arthur@example.com',
    From: 'notifications@honeybadger.io',
    BouncedAt: new Date().toISOString()
  },
  Type: 'HardBounce',
  TypeCode: 1,
  Name: 'Hard bounce',
  Description: 'The server was unable to deliver your message (ex: unknown user, mailbox not found).'
}

describe('MessagesRepository', () => {
  let slackClient: SinonStubbedInstance<SlackClient>

  beforeEach(() => {
    slackClient = createStubInstance(SlackClient)
  })

  describe('#postMessage', () => {
    it('throws error when Slack throws', async () => {
      slackClient.postMessage.rejects(new Error('LOL'))
      try {
        await slackClient.postMessage(spamPayload)
      } catch (err: unknown) {
        const error = err as Error
        expect(error).to.be.an.instanceOf(Error)
        expect(error.message).to.equal('LOL')
      }
    })

    it('returns correct data', async () => {
      slackClient.postMessage.resolves('2023-03-12T03:23:36.376Z')
      const result = await slackClient.postMessage(normalPayload)
      expect(result).to.equal('2023-03-12T03:23:36.376Z')
    })
  })
})
