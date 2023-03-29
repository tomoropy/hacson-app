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

    const prompt = `Please suggest the ideal men's outfit for a date under the following conditions. 
    Also, provide the URL of a shopping site where the suggested outfit can be purchase 

    Scene: ${scene}
    Date: ${date}
    Location: ${location}
    Weather: (automatically calculated)
    My Infomation:
    Age: ${age} years old
    height: ${height} cm
    Target wonman Infomation:
    Female partner's hobbies: ${hobbies}
    Female partner's favorite celebrity: ${favoriteCelebrity}
    Female partner's occupation: ${occupation}

    NOTE:
    * Response must be Japanese.
    * Please suggest three outfit options.
    
    Example:
    シチュエーションに応じて、最適なデート服装を提案します。ただし、具体的な情報が変数のままで入力されていますので、以下の一般的なアドバイスに基づいて提案させていただきます。

    シチュエーションに応じた3つの服装オプション:

    1.カジュアルデート向け
      トップス: シンプルな無地のTシャツ
      ボトムス: スリムフィットのデニムジーンズ
      シューズ: スニーカー

    2.フォーマルなレストランデート向け
      トップス: シャツ（白または淡い色）
      ボトムス: スラックス（黒または紺）
      シューズ: ドレスシューズ（黒または紺）

    3.アクティブなデート向け
      トップス: ポロシャツまたは吸汗性の良いTシャツ
      ボトムス: カーゴパンツまたはスポーツウェア
      シューズ: スポーツシューズ
    
    以下は、日本のショッピングサイトのURLです。それぞれのサイトで提案された服装を購入することができます。

    ZOZOTOWN: https://zozo.jp/
    UNIQLO: https://www.uniqlo.com/jp/
    BEAMS: https://www.beams.co.jp/

    シチュエーションやお相手の情報により、服装を調整してください。最後に、デートの場所やお相手の趣味に合わせたアクセサリーや小物を加えることで、印象をアップさせることができます。
`;

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
        max_tokens: 700,
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
