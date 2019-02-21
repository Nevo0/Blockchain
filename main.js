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

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timesTamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2019", "Benesis Block", "0");
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLastBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let myCoin = new Blockchain();
myCoin.addBlock(new Block(1, "02/01/2019", { amount: 4 }));
myCoin.addBlock(new Block(2, "12/01/2019", { amount: 4 }));
myCoin.addBlock(new Block(3, "014/01/2019", { amount: 4 }));

// console.log(JSON.stringify(myCoin, null, 4));
console.log("Is blockchainvalid?" + myCoin.isChainValid());

myCoin.chain[1].data = { amount: 12 };
myCoin.chain[1].hash = myCoin.chain[1].calculateHash();

console.log("Is blockchainvalid?" + myCoin.isChainValid());
console.log(myCoin);
