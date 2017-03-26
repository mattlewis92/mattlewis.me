import { Mattlewis.MePage } from './app.po';

describe('mattlewis.me App', () => {
  let page: Mattlewis.MePage;

  beforeEach(() => {
    page = new Mattlewis.MePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
