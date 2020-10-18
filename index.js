const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN, {
  webhookReply: true
});
bot.telegram.setWebhook(process.env.WEB_HOOK)

const randomCaps = (c) => Math.round(Math.random()) ? c.toUpperCase() : c.toLowerCase();
const isUpperCase = (arr) => /^[A-Z]*$/.test(arr.join(''))
const isLowerCase = (arr) => /^[a-z]*$/.test(arr.join(''))
const reducer = (newArr, c, i) => {
  if (i <= 1) {
    newArr.push(randomCaps(c));
    return newArr;
  }
  if (isUpperCase(newArr.slice(i-2, i))) {
    newArr.push(c.toLowerCase());
    return newArr;
  } else if (isLowerCase(newArr.slice(i-2, i))) {
    newArr.push(c.toUpperCase());
    return newArr;
  }
  newArr.push(randomCaps(c));
  return newArr;
}

const randomCapitalization = (input) => input.split('').reduce(reducer, []).join('');


bot.start((ctx) => ctx.reply(randomCapitalization("Welcome! Send me anything and I'll send it back to you in party caps!")))
bot.on('text', async (ctx) => {
  console.log("RECEIVED MSG: ", ctx.update.message.text);
  await ctx.reply(randomCapitalization(ctx.update.message.text))
})
bot.on('inline_query', async (ctx) => {
  console.log("RECEIVED INLINE Q: " + ctx.inlineQuery.query);
  let result = [];
  if (ctx.inlineQuery.query !== "") {
    const formattedResult = randomCapitalization(ctx.inlineQuery.query);
    result = [{
      id: 1,
      type: "article",
      title: "PaRTy cApS",
      description: formattedResult,
      input_message_content: {
        message_text: formattedResult
      }
    }]
  }
  await ctx.answerInlineQuery(result);
})

exports.handler = async function(event, context) {
  if (!event || !event.body) {
    return {
      statusCode: 422,
      body: ''
    }
  }
  
  let update;
  try {
    update = JSON.parse(event.body)
  } catch (e) {
    console.error('JSON parse error', e)
    return {
      statusCode: 500,
      body: ''
    }
  }
  
  await bot.handleUpdate(update);
  return {
    statusCode: 200,
    body: ''
  };
  
}
