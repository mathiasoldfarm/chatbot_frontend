export default (state) => {
  const botMessages = state.chatbot.messageList.filter(message => message.type === "bot");
  return botMessages[botMessages.length - 1]?.data?.section?.name
}