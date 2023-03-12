import notificationController from '../../src/notificationController'
import { expect } from 'chai'
import sinon from 'sinon'

describe('notificationController', () => {
  let clock: sinon.SinonFakeTimers
  const callSlackNotificationStub = sinon.stub(notificationController, 'callSlackNotification')

  beforeEach(() => {
    // Create a fake clock
    clock = sinon.useFakeTimers(new Date('2023-03-12T03:23:36.376Z').getTime())
  })

  afterEach(() => {
    clock.restore()
  })

  it('should not send slack notification if it finds the messsage tag', async () => {
    const email = 'zaphod@example.com'
    const messages = 'test message'

    const payload = await notificationController.handleSlackNotification(email, messages)
    sinon.assert.notCalled(callSlackNotificationStub)

    expect(payload).to.deep.equal({
      OtherMessages: {
        RecordType: 'Bounce',
        MessageStream: 'outbound',
        Tag: 'TEST',
        Email: email,
        From: 'notifications@honeybadger.io',
        BouncedAt: new Date().toISOString()
      },
      Type: 'HardBounce',
      TypeCode: 1,
      Name: 'Hard bounce',
      Description: 'The server was unable to deliver your message (ex: unknown user, mailbox not found).'
    })
  })

  it('should send slack notification if the message tag is empty', async () => {
    const email = 'zaphod@example.com'
    const messages = ''

    const payload = await notificationController.handleSlackNotification(email, messages)
    sinon.assert.calledOnce(callSlackNotificationStub)
    sinon.assert.calledWithExactly(callSlackNotificationStub, payload)

    expect(payload).to.deep.equal({
      OtherMessages: {
        RecordType: 'Bounce',
        MessageStream: 'outbound',
        Tag: '',
        Email: email,
        From: 'notifications@honeybadger.io',
        BouncedAt: new Date().toISOString()
      },
      Type: 'SpamNotification',
      TypeCode: 512,
      Name: 'Spam notification',
      Description:
        'The message was delivered, but was either blocked by the user, or classified as spam, bulk mail, or had rejected content.'
    })
  })
})
