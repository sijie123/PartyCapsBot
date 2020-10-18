### Party Caps Bot

ThiS Is A TElEGraM BOt ThaT wIll eCHo BaCK TO You WhaTevER YOu SAiD, buT IN pARtY caPs. InsPirEd By [thIS PytHOn SCriPT](https://www.reddit.com/r/Python/comments/j8kpes/i_made_a_script_that_randomly_capitalizes_letters/).

yOU CAn TalK tO THe BoT By [mESsaGIng @PartyCapsBot On tElEGraM](https://t.me/partycapsbot) Or, iN anY chAT, stArt TYpiNG @PartyCapsBot.

### Deployment

OK. On to the slightly more mundane stuff.

This Telegram bot is written using [Telegraf](https://telegraf.js.org/#/), intended to be deployed as a Serverless Telegram Bot. It uses (Telegram's WebHook API](https://core.telegram.org/bots/webhooks) to receive messages and updates.

Currently, it is deployed on AWS Lambda. WebHook requests from Telegram reach an AWS Gateway endpoint, which then uses the AWS Lambda Function as a request handler.

\[Telegram\] --> \[AWS Gateway (https://redacted_entrypoint.amazonaws.com/default/CapsBot)\] --> \[AWS Lambda function (CapsBot)\]

