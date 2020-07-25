import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimHortonsSaugeenMaitlandComponent } from './tim-hortons-saugeen-maitland.component';

describe('TimHortonsSaugeenMaitlandComponent', () => {
  let component: TimHortonsSaugeenMaitlandComponent;
  let fixture: ComponentFixture<TimHortonsSaugeenMaitlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimHortonsSaugeenMaitlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimHortonsSaugeenMaitlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
