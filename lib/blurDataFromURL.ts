import axios from "axios";
import sharp from "sharp";

export const blurDataFromExternalURL = async (url: string) => {
    const input = (await axios({url, responseType: "arraybuffer"})).data as Buffer;
    const output = await sharp(input).resize({width: 80}).blur(5).jpeg().toBuffer();
    return `data:image/jpeg;base64,${output.toString('base64')}`
}
