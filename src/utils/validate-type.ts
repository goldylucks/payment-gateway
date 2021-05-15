export const validateType = ({ argKey, argValue, expectedType }: IArgs) => {
  const argType = typeof argValue // TODO handle arrays
  if (argType !== expectedType) {
    throw new Error(`${argKey} is of type ${argType}. Expected ${expectedType}`)
  }
}

interface IArgs {
  argKey: string
  argValue: any
  expectedType: string
}
