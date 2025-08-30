import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasPage } from './marcas.page';

describe('Marcas Page', () => {
  let component: MarcasPage;
  let fixture: ComponentFixture<MarcasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcasPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
