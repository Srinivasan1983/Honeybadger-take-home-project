export const baseConfig = {
  port: process.env.PORT || 3000,
  slack: {
    token: process.env.SLACK_TOKEN || '',
    channel: process.env.CHANNEL || ''
  }
} as const
