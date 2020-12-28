class Helpers {
  static generateId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (const i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  static hash(input) {
    let hash = 0;
    if (input.length == 0) return hash;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash = hash & hash;
    }
    return hash;
  }
}
