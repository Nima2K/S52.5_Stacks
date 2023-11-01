class Node {
    constructor(val) {
      this.val = val;
      this.next = null;
    }
  }
  
  class Queue {
    constructor() {
      this.first = null;
      this.last = null;
    }
  
    enqueue(val) {
      const newNode = new Node(val);
      if (!this.first) {
        this.first = newNode;
        this.last = newNode;
      } else {
        this.last.next = newNode;
        this.last = newNode;
      }
    }
  
    dequeue() {
      if (!this.first) {
        throw new Error('Queue is empty');
      }
  
      const oldFirst = this.first;
      this.first = oldFirst.next;
  
      if (!this.first) {
        this.last = null;
      }
  
      return oldFirst.val;
    }
  
    peek() {
      if (!this.first) {
        return null;
      }
  
      return this.first.val;
    }
  
    isEmpty() {
      return this.first === null;
    }
  }
  
  class Stack {
    constructor() {
      this.top = null;
    }
  
    push(val) {
      const newNode = new Node(val);
      newNode.next = this.top;
      this.top = newNode;
    }
  
    pop() {
      if (!this.top) {
        throw new Error('Stack is empty');
      }
  
      const oldTop = this.top;
      this.top = oldTop.next;
      return oldTop.val;
    }
  
    peek() {
      if (!this.top) {
        return null;
      }
  
      return this.top.val;
    }
  
    isEmpty() {
      return this.top === null;
    }
  }
  
  // String Reversal
  function reverseString(str) {
    let result = '';
    const stack = new Stack();
  
    for (let i = 0; i < str.length; i++) {
      stack.push(str[i]);
    }
  
    while (!stack.isEmpty()) {
      result += stack.pop();
    }
  
    return result;
  }
  
  // Balanced Brackets
  function isBalanced(str) {
    const stack = new Stack();
  
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(' || str[i] === '[' || str[i] === '{') {
        stack.push(str[i]);
      } else if (str[i] === ')' || str[i] === ']' || str[i] === '}') {
        if (stack.isEmpty()) {
          return false;
        }
  
        const openBracket = stack.pop();
        if (
          (str[i] === ')' && openBracket !== '(') ||
          (str[i] === ']' && openBracket !== '[') ||
          (str[i] === '}' && openBracket !== '{')
        ) {
          return false;
        }
      }
    }
  
    return stack.isEmpty();
  }
  
  // Josephus Survivor
  function find_survivor(numPeople, skip) {
    const queue = new Queue();
  
    for (let i = 1; i <= numPeople; i++) {
      queue.enqueue(i);
    }
  
    while (queue.first !== queue.last) {
      for (let i = 1; i < skip; i++) {
        queue.enqueue(queue.dequeue());
      }
      queue.dequeue();
    }
  
    return queue.peek();
  }
  
  // Polish Notation Calculator
  function calc(expression) {
    const tokens = expression.split(' ');
    const stack = new Stack();
  
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i];
      if (!isNaN(token)) {
        stack.push(parseFloat(token));
      } else {
        const operand1 = stack.pop();
        const operand2 = stack.pop();
        switch (token) {
          case '+':
            stack.push(operand1 + operand2);
            break;
          case '-':
            stack.push(operand1 - operand2);
            break;
          case '*':
            stack.push(operand1 * operand2);
            break;
          case '/':
            stack.push(operand1 / operand2);
            break;
          default:
            throw new Error('Invalid operator');
        }
      }
    }
  
    return stack.pop();
  }
  
  // Examples
  console.log(reverseString('hello')); // Output: olleh
  console.log(isBalanced('(([]))')); // Output: true
  console.log(isBalanced('(([])')); // Output: false
  console.log(find_survivor(10, 3)); // Output: 4
  console.log(calc('+ 1 2')); // Output: 3
  console.log(calc('* 2 + 1 2')); // Output: 6
  console.log(calc('+ 9 * 2 3')); // Output: 15
  