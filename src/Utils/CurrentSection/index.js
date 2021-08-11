export const currentSectionName  =(state) => {
  const botMessages = state.chatbot.messageList.filter(message => message.type === "bot" && !message?.data?.section?.takeInput);
  return botMessages[botMessages.length - 1]?.data?.section?.name
}

export const currentSectionId = (state) => {
  const botMessages = state.chatbot.messageList.filter(message => message.type === "bot" && !message?.data?.section?.takeInput);
  return botMessages[botMessages.length - 1]?.data?.section?.id
}