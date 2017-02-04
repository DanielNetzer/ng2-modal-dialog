import { ModalexamplesPage } from './app.po';

describe('modalexamples App', function() {
  let page: ModalexamplesPage;

  beforeEach(() => {
    page = new ModalexamplesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
