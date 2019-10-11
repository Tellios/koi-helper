import * as winston from "winston";

export type LogLevel = "verbose" | "info" | "warning" | "error";

const { combine, colorize, timestamp, prettyPrint, printf } = winston.format;

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "warning" : "info",
  transports: [new winston.transports.Console()],
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
