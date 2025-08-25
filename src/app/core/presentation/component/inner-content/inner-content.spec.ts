import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerContent } from './inner-content';

describe('InnerContent', () => {
  let component: InnerContent;
  let fixture: ComponentFixture<InnerContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnerContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
