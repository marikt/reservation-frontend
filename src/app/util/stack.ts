export class Stack<T> {
  private readonly items: T[];

  constructor() {
    this.items = [];
  }

  // Push an item onto the stack
  push(item: T): void {
    this.items.push(item);
  }

  // Pop an item off the stack
  pop(): T | undefined {
    return this.items.pop();
  }

  // Peek at the top item of the stack without removing it
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Get the size of the stack
  size(): number {
    return this.items.length;
  }
}
