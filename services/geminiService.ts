
import { GoogleGenAI, Type } from "@google/genai";
import { UserInfo, HoroscopeData } from "../types";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

export const getHoroscopeInterpretation = async (data: HoroscopeData) => {
  const { userInfo, canChiYear, element } = data;
  const currentYear = 2026;
  const currentCanChi = "Bính Ngọ";
  
  const prompt = `
    Bạn là một bậc thầy tử vi và mệnh lý học uyên bác. 
    Hãy thực hiện luận giải lá số tử vi trọn đời và vận hạn năm ${currentYear} (${currentCanChi}) cho:
    - Chủ sự: ${userInfo.fullName}
    - Năm sinh: ${new Date(userInfo.birthDate).getFullYear()} (${canChiYear.full})
    - Giới tính: ${userInfo.gender}
    - Bản mệnh (Nạp Âm): ${element} (Ví dụ: Sơn Đầu Hỏa, Hải Trung Kim...)

    Yêu cầu xuất dữ liệu JSON chính xác theo cấu trúc:
    {
      "tongQuan": "Phân tích sâu sắc (800-1000 chữ) về cốt cách, đặc tính nạp âm ${element}, tính cách và xu hướng vận mệnh.",
      "cacCung": [
        { "tenCung": "Mệnh", "luanGiai": "Phân tích chi tiết về bản mệnh, tài năng (1000 chữ)." },
        ... (đủ 12 cung truyền thống)
      ],
      "daiVan": [
        { "giaiDoan": "23-32", "luanGiai": "Chi tiết về sự nghiệp, tình duyên giai đoạn này." },
        ... (ít nhất 5 đại vận)
      ],
      "tieuVan2026": "Luận giải chi tiết vận hạn năm 2026 Bính Ngọ cho người mệnh ${element}. Phân tích công việc, tài lộc và sức khỏe.",
      "loiKhuyen": "Các phương pháp cải vận cụ thể dựa trên ngũ hành bản mệnh ${element}."
    }

    Văn phong: Sang trọng, uyên bác, huyền bí nhưng mang tính định hướng cao. Luận giải cực kỳ chi tiết.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tongQuan: { type: Type.STRING },
            cacCung: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  tenCung: { type: Type.STRING },
                  luanGiai: { type: Type.STRING }
                },
                required: ["tenCung", "luanGiai"]
              }
            },
            daiVan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  giaiDoan: { type: Type.STRING },
                  luanGiai: { type: Type.STRING }
                }
              }
            },
            tieuVan2026: { type: Type.STRING },
            loiKhuyen: { type: Type.STRING }
          },
          required: ["tongQuan", "cacCung", "daiVan", "tieuVan2026", "loiKhuyen"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Analysis Error:", error);
    return null;
  }
};
