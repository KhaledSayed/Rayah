import { BlankModule } from './blank.module';

describe('BlankModule', () => {
  let blankModule: BlankModule;

  beforeEach(() => {
    blankModule = new BlankModule();
  });

  it('should create an instance', () => {
    expect(blankModule).toBeTruthy();
  });
});
