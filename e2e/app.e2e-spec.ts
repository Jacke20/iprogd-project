import { IprogdProjectPage } from './app.po';

describe('iprogd-project App', () => {
  let page: IprogdProjectPage;

  beforeEach(() => {
    page = new IprogdProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
