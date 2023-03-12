# Honeybadger Take-home

Name:- Srinivasan Swaminathan - implementation of the Honeybadger take-home project.

## Stack

This is written in TypeScript using Node and YARN.

The tests can be run with `yarn run test`

## Installation

(The following assumes you already have Node and NPM installed)

1. Clone the repository
2. Install dependencies with `YARN install`
3. Create a `.env` file and add values for `CHANNEL` and `SLACK_TOKEN`

The `CHANNEL` should be the channel ID of whichever Slack channel you want the worker
to send notifications to. _Note:_ The bot must be added to the channel for the messages to
actually appear in the channel.

You can get the channel ID by exploring the Slack API programmatically or by taking the final
segment of the url you receive when you go to share a channel in Slack.

The `SLACK_TOKEN` is the Slack OAuth token for your bot/app. _Note:_ It must have the `chat:write`
permission scope for this worker to work correctly. See the documentation for
[posting messages in Slack](https://api.slack.com/methods/chat.postMessage).

If you don't already have a Slack bot/app setup, [there is documentation here.](https://api.slack.com/authentication/basics)

## Local Development

To run the worker in development mode, run `yarn run dev`.

In order to send a Spam Notification to your local development server, run the following JSON object through postman:

if the message is empty string it will through notification to the slack channel

```
{
    "email": "test1@example.com",
    "message":" "
}
```

In order to run a non-Spam Notification, run the following JSON object through postman:

if the message has non empty string the app will run without any notification to the slack channel

```
{
    "email": "test1@example.com",
    "message":"test message "
}
```

Be sure you're `GET`ing to `/api/handleNotification` wherever the app is running
(`http://localhost:3000` when running locally unless otherwise configured)
