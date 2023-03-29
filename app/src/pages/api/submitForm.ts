// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  if (req.method === "POST") {
    try {
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

      // OpenAI API キーを環境変数から取得します。
      const apiKey = process.env.OPENAI_API_KEY;

      // 質問を作成します。
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

      // OpenAI API にリクエストを送信します。
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt,
          max_tokens: 100,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const answer = response.data.choices[0].text.trim();
      res.status(200).json({ answer });
    } catch (error) {
      // res.status(500).json({ error: error?.message || error?.toString() });
      console.log("errorが発生した");
      console.log(error);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
