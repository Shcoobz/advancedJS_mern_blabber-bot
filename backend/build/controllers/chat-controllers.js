import { OpenAIApi } from 'openai';
import { configureOpenAI } from '../config/openai-config.js';
import User from '../models/User.js';
export async function generateChatCompletion(req, res, next) {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: 'User not registered or token malfunction!' });
        // get all chats of user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: 'user' });
        // send all chats with new one to api
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        //  get res
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went terribly wrong!' });
    }
}
//# sourceMappingURL=chat-controllers.js.map