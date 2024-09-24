import chalk from "chalk";
import { ENVIRONMENT } from "./config";

export class ApiError {
  private static _title: string;
  private static _statusCode: number;
  private static _description?: string;
  private static _isDevEnv: boolean = ENVIRONMENT === "development";

  static logger(message: string, status: number) {
    const chalkLine = chalk.blue.bold("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    const chalkMessage = chalk.red.bold(`\nError: ${message}\n`);
    const chalkStatus = chalk.red.bold.underline(`\nStatus: ${status}\n`);

    console.log(chalkLine);

    console.log(chalkMessage);
    console.log(chalkStatus);

    console.log(chalkLine);
  }

  static makeError(message: string, status: number) {
    const error = new Error(message);
    // @ts-ignore
    error.error = status;

    return error;
  }

  static generate(
    error: any,
    alt?: string
  ): {
    title: string;
    status: number;
    variant: "destructive";
    description?: string;
  } {
    if (typeof error?.response?.data?.message === "string") {
      this._title = error?.response?.data?.message;
    } else if (Array.isArray(error?.response?.data?.message)) {
      this._title = error?.response?.data?.message[0];
    } else if (error?.response?.data?.message) {
      this._title = error?.response?.data?.message;
    } else if (error?.message) {
      this._title = error?.message;
    } else if (alt) this._title = alt;
    else this._title = "An error occurred";

    this._statusCode = error?.response?.status || error?.error || 500;

    if (error?.response?.data?.error) {
      this._description = error?.response?.data?.error;
    }

    if (this._isDevEnv) {
      this.logger(this._title, this._statusCode);
    }

    return {
      title: this._title,
      status: this._statusCode,
      description: this._description,
      variant: "destructive",
    };
  }

  static log(error: any) {
    const { title, status, description } = this.generate(error);

    console.log(
      chalk.red.bold(`\nError: ${title} (${status})\n`),
      description ? chalk.red(`\n${description}\n`) : ""
    );
  }
}
