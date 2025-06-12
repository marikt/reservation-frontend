export class IntroAnimationEvent {


  constructor(label: string, color: string, person: string, height: number, paddingTop: number) {
    this.label = label;
    this.color = color;
    this.person = person;
    this.height = height;
    this.paddingTop = paddingTop;
  }

  public label: string;
  public color: string;
  public person: string;
  public show: boolean;
  public height: number;
  public paddingTop: number;


}
