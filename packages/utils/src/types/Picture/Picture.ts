export default class Picture {
  private _picId: string;
  private _largeImg: ArrayBuffer;
  private _objectName: string;
  private _creditText: string;
  private _description: string;

  constructor(
    picId: string,
    largeImg: ArrayBuffer,
    objectName: string,
    creditText: string,
    description: string
  ) {
    this._picId = picId;
    this._largeImg = largeImg;
    this._objectName = objectName;
    this._creditText = creditText;
    this._description = description;
  }

  public get picId() {
    return this._picId;
  }

  public get largeImg() {
    return this._largeImg;
  }

  public get objectName() {
    return this._objectName;
  }

  public get creditText() {
    return this._creditText;
  }

  public get description() {
    return this._description;
  }
}
