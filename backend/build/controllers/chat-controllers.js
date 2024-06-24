import { OpenAIApi } from 'openai';
import { configureOpenAI } from '../config/openai-config.js';
import { INDEX, MSG, OPENAI, ROLE } from '../constants/constants.js';
import User from '../models/User.js';
async function getUserChats(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error(MSG.ERROR.USER.NOT_REGISTERED);
    }
    return user;
}
function prepareChats(user, message) {
    const chats = user.chats.map(({ role, content }) => ({
        role,
        content,
    }));
    chats.push({ content: message, role: ROLE.USER });
    user.chats.push({ content: message, role: ROLE.USER });
    return chats;
}
async function sendToOpenAI(chats) {
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
        model: OPENAI.MODEL,
        messages: chats,
    });
    const message = chatResponse.data.choices[INDEX.FIRST].message;
    return message;
}
function saveAndRespond(user, res, message) {
    user.chats.push(message);
    user
        .save()
        .then(() => {
        res.status(200).json({ chats: user.chats });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ message: MSG.ERROR.GENERAL.SOMETHING_WENT_WRONG });
    });
}
export async function generateChatCompletion(req, res, next) {
    const { message } = req.body;
    try {
        const user = await getUserChats(res.locals.jwtData.id);
        const chats = prepareChats(user, message);
        const chatResponseMessage = await sendToOpenAI(chats);
        saveAndRespond(user, res, chatResponseMessage);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: MSG.ERROR.GENERAL.SOMETHING_WENT_WRONG });
    }
}
// export async function generateChatCompletion(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const { message } = req.body;
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) return res.status(401).json({ message: MSG.ERROR.USER.NOT_REGISTERED });
//     // get all chats of user
//     const chats = user.chats.map(({ role, content }) => ({
//       role,
//       content,
//     })) as ChatCompletionRequestMessage[];
//     chats.push({ content: message, role: ROLE.USER });
//     user.chats.push({ content: message, role: ROLE.USER });
//     // send all chats with new one to api
//     const config = configureOpenAI();
//     const openai = new OpenAIApi(config);
//     const chatResponse = await openai.createChatCompletion({
//       model: OPENAI.MODEL,
//       messages: chats,
//     });
//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save();
//     //  get res
//     return res.status(200).json({ chats: user.chats });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: MSG.ERROR.GENERAL.SOMETHING_WENT_WRONG });
//   }
// }
export async function sendChatsToUser(req, res, next) {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered or token malfunction!');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(403).send("Permissions didn't match!");
        }
        return res.status(200).json({ message: 'OK!', chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error', cause: error.message });
    }
}
export async function deleteChats(req, res, next) {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered or token malfunction!');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(403).send("Permissions didn't match!");
        }
        user.chats.splice(0, user.chats.length);
        await user.save();
        return res.status(200).json({ message: 'OK!' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error', cause: error.message });
    }
}
//# sourceMappingURL=chat-controllers.js.map