export class EmptyTaskDescriptionError extends Error {
  constructor() {
    super('Task description cannot be empty.')
  }
}
