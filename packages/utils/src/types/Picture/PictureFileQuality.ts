type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type DoubleDigit = `${Digit}${Digit}`;

type PictureFileQuality = (quality: DoubleDigit) => number;

export default PictureFileQuality;
