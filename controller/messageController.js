import Message from "../model/messageModel.js";
import User from "../model/userModel.js";
import Chat from "../model/chatModel.js";
import _ from "lodash";

export const sendMessage = async (req, res) => {
  const { content, mediaType, chatId } = req.body;

  if (_.some([content, mediaType], (item) => _.isEmpty(item))) {
    res.send(400).send({
      error: "Please enter the message",
    });
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name profilePic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name profilePic email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.status(200).json({
      message,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const fetchMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name profilePic email")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
