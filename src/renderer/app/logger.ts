import * as winston from "winston";
import * as path from "path";
import * as envPaths from "env-paths";

export type LogLevel = "verbose" | "info" | "warning" | "error";

const isProduction = process.env.NODE_ENV === "production";
const { combine, colorize, timestamp, prettyPrint, printf } = winston.format;
const { Console, File } = winston.transports;
const transports: Array<
  | winston.transports.ConsoleTransportInstance
  | winston.transports.FileTransportInstance
> = [new Console()];

if (isProduction) {
  const filename = path.join(envPaths("koi-helper").log, "kh.log");

  transports.push(
    new File({
      maxFiles: 5,
      maxsize: 10000000,
      tailable: true,
      filename,
      level: "verbose",
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        printf(
          ({ level, timestamp, message }) =>
            `${timestamp} - ${level}: ${message}`
        )
      )
    })
  );

  console.log(`Production detected, logs available at:`, filename);
}

export const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  transports,
  format: combine(
    colorize(),
    timestamp({ format: "HH:mm:ss" }),
    prettyPrint({ colorize: true }),
    printf(
      ({ level, timestamp, message }) => `${timestamp} ${level}: ${message}`
    )
  )
});

export interface ILogFunctionOptions {
  logStart: boolean;
  logEnd: boolean;
  level: LogLevel;
}

function getTargetName(target: Object | Function) {
  if ("name" in target) {
    return target.name;
  } else {
    return target.constructor.name;
  }
}

export function LogFunction(
  options?: Partial<ILogFunctionOptions>
): MethodDecorator {
  const opts = {
    ...{
      logStart: true,
      logEnd: false,
      level: "verbose"
    },
    ...(options || {})
  };

  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    const fn = descriptor.value;
    const targetName = getTargetName(target);

    descriptor.value = function(...args: any[]) {
      if (opts.logStart) {
        logger.log(
          opts.level,
          `${targetName}.${propertyKey.toString()} - called`
        );
      }

      const result = fn.apply(this, args);

      if (opts.logEnd) {
        logger.log(
          opts.level,
          `${targetName}.${propertyKey.toString()} - call ended`
        );
      }

      return result;
    };
  };
}
