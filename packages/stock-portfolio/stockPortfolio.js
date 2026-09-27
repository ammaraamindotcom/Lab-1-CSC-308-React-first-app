class StockPortfolio {
    constructor() {
      this.stocks = {};
    }
  
    isEmpty() {
      return Object.keys(this.stocks).length === 0;
    }
  
    buy(symbol, shares) {
      this.stocks[symbol] = (this.stocks[symbol] || 0) + shares;
    }
    
    sell(symbol, shares) {
        if (shares > this.getShares(symbol)) {
          throw new Error("Not possible to sell this number of shares.");
        }
      
        this.stocks[symbol] -= shares;
      
        if (this.stocks[symbol] === 0) {
          delete this.stocks[symbol];
        }
      }

    getShares(symbol) {
        return this.stocks[symbol] || 0;
      }

    getSymbolCount() {
        return Object.keys(this.stocks).length;
      }
  }
  
  module.exports = StockPortfolio;