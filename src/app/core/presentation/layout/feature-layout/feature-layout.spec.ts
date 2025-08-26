import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureLayout } from './feature-layout';

describe('FeatureLayout', () => {
  let component: FeatureLayout;
  let fixture: ComponentFixture<FeatureLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
