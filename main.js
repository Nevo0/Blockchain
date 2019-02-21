const SHA256 = require("crypto-js/sha256");

class Block {
  // index = numer w łancuchu //timesTamp= data stworzenia //data= informacje o bloku //previousHash = poprzedni block
  constructor(index, timesTamp, data, previousHash = "") {
    this.index = index;
    this.timesTamp = timesTamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash;
  }

  //

  calculateHash = () => {
    return SHA256(
      this.index +
        this.previousHash +
        this.timesTamp +
        JSON.stringify(this.data)
    ).toString();
  };
}
