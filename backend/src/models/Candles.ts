import { CandleColor } from "../enums/CandleColor";

export class Candle {
  low: number;
  high: number;
  open: number;
  close: number;
  color: CandleColor;
  finalDateTime: Date;
  values: number[];
  currency: string;
  constructor(finalDateTime: Date, currency: string) {
    this.low = Infinity;
    this.high = 0;
    this.open = 0;
    this.close = 0;
    this.color = CandleColor.UNDETERMINED;
    this.finalDateTime = finalDateTime;
    this.values = [];
    this.currency = currency;
  }

  adicionarValor(value: number) {
    this.values.push(value);
    if (this.values.length < 1) {
      this.open = value;
    }

    if (this.low > value) {
      this.low = value;
    }

    if (this.high < value) {
      this.high = value;
    }
  }

  closeCandle() {
    if (this.values.length > 1) {
      this.close = this.values[this.values.length - 1];
    }
    this.finalDateTime = new Date();

    if (this.open > this.close) {
      this.color = CandleColor.RED;
    } else if (this.open < this.close) {
      this.color = CandleColor.GREEN;
    }
  }

  toSimpleObj() {
    const { values, ...obj } = this;
    return obj;
  }
}
