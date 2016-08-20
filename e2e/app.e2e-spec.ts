import { Demo0820Page } from './app.po';

describe('demo0820 App', function() {
  let page: Demo0820Page;

  beforeEach(() => {
    page = new Demo0820Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
