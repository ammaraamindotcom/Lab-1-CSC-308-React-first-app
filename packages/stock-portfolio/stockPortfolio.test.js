const StockPortfolio = require("./stockPortfolio");

test("a new stock portfolio is empty", () => {
  const portfolio = new StockPortfolio();

  expect(portfolio.isEmpty()).toBe(true);
});

test("buying shares adds them to the portfolio", () => {
    const portfolio = new StockPortfolio();
  
    portfolio.buy("AAPL", 10);
  
    expect(portfolio.getShares("AAPL")).toBe(10);
  });

  test("buying more shares of the same stock adds to the existing shares", () => {
    const portfolio = new StockPortfolio();
  
    portfolio.buy("AAPL", 10);
    portfolio.buy("AAPL", 5);
  
    expect(portfolio.getShares("AAPL")).toBe(15);
  });

  test("selling shares subtracts from the portfolio", () => {
    const portfolio = new StockPortfolio();
  
    portfolio.buy("AAPL", 10);
    portfolio.sell("AAPL", 4);
  
    expect(portfolio.getShares("AAPL")).toBe(6);
  });

  test("selling all shares removes the stock from the portfolio", () => {
    const portfolio = new StockPortfolio();
  
    portfolio.buy("AAPL", 10);
    portfolio.sell("AAPL", 10);
  
    expect(portfolio.getShares("AAPL")).toBe(0);
    expect(portfolio.isEmpty()).toBe(true);
  });

  test("counts unique ticker symbols", () => {
    const portfolio = new StockPortfolio();
  
    portfolio.buy("AAPL", 10);
    portfolio.buy("MSFT", 5);
    portfolio.buy("AAPL", 2);
  
    expect(portfolio.getSymbolCount()).toBe(2);
  });

  test("cannot sell more shares than owned", () => {
    const portfolio = new StockPortfolio();
  
    portfolio.buy("AAPL", 10);
  
    expect(() => {
      portfolio.sell("AAPL", 15);
    }).toThrow("Not possible to sell this number of shares.");
  });

  /*
reflection - TDD was a little weird at first because I normally just write
the code and test it after. Doing the tests first helped me think about
what each part of the portfolio was actually supposed to do. I also liked
being able to add one feature at a time and make sure it worked before
moving on.
*/