import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      scene,
      date,
      location,
      age,
      height,
      hobbies,
      favoriteCelebrity,
      occupation,
    } = req.body;

    const prompt = `以下の条件に合った服装の提案をしてください。
シーン: ${scene}
日付: ${date}
場所: ${location}
天気: （自動計算されます）
年齢: ${age}歳
身長: ${height}cm
趣味: ${hobbies}
好きな芸能人: ${favoriteCelebrity}
職種: ${occupation}`;

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "以下の条件に合った服装の提案をしてください。",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 100,
        n: 1,
        temperature: 0.7,
      });

      const answer = completion.data.choices[0].message?.content;

      console.log(answer);

      res.status(200).json({ answer });
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: "An error occurred during your request.",
          },
        });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
