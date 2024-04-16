export class EmptyTaskTitleError extends Error {
  constructor() {
    super('Task title cannot be empty.')
  }
}
