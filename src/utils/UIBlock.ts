import { ChildObject, Position } from '../interfaces/utils.interface';

export class UIBlock {
  private _x = 0;
  private _y = 0;
  private _oldX = 0;
  private _oldY = 0;
  private _visible = true;
  private _displayWidth = 0;
  private _displayHeight = 0;
  public children: ChildObject[] = [];
  public childIndex = -1;
  public isPosBlock = true;
  private _depth: number = 1;
  private _alpha: number = 1;
  public gw: any;

  constructor() {}

  set depth(val) {
    this._depth = val;
    if (this.children.length > 0) {
      this.setChildDepth(this.children[0]);
    }
  }

  get depth() {
    return this._depth;
  }

  setChildDepth(child: ChildObject): void {
    //console.log(child);
    const realDepth = this._depth * 100 + child.childIndex;
    console.log(realDepth);
    if (child.scene == undefined) {
      child.scene = this.gw.model.currentScene;
    }
    child.depth = realDepth;
    //  child.setDepth(realDepth);
    if (child.nextChild != null) {
      this.setChildDepth(child.nextChild);
    }
  }

  set x(val) {
    //record the current x into oldX
    this._oldX = this._x;
    //
    //update the value
    this._x = val;
    //
    //update the children
    this.updatePositions();
  }

  set y(val) {
    //record the current y into oldY
    this._oldY = this._y;
    //
    //update the value
    this._y = val;
    //update the children
    this.updatePositions();
  }

  //getters
  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  //add a child
  add(child: ChildObject): void {
    //up the index
    this.childIndex++;
    //make a note of the index inside the child
    child.childIndex = this.childIndex;
    //add to the array
    this.children.push(child);
    //build the linked list
    this.buildList();
  }

  /* removeAvatar(userID) {
        if (this.avatars[userID]) {
            const avatar = this.avatars[userID];
            if (avatar.prevAvatar) avatar.prevAvatar.nextAvatar = avatar.nextAvatar;
            avatar.destroy();
            delete this.avatars[userID];
        }
    }*/

  removeChild(child: ChildObject): void {
    //take the child off the array based on index
    this.children.splice(child.childIndex, 1);

    //
    //rebuild the linked list
    this.buildList();
    //rebuild the indexes
    const len = this.children.length;
    for (let i = 0; i < len; i++) {
      this.children[i].childIndex = i;
    }
    //set the childIndex to the length of the array
    this.childIndex = len;
  }

  buildList(): void {
    const len = this.children.length;
    if (len > 1) {
      for (let i = 1; i < len; i++) {
        //set the current child to the previous child's nextChild property
        this.children[i - 1].nextChild = this.children[i];
      }
    }
    this.children[len - 1].nextChild = null;
  }

  willRender(): void {}

  get displayWidth() {
    return this._displayWidth;
  }

  get displayHeight() {
    return this._displayHeight;
  }

  setSize(w, h) {
    this._displayWidth = w;
    this._displayHeight = h;
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
    this.updatePositions();
  }

  set visible(val) {
    if (this._visible != val) {
      this._visible = val;
      if (this.children.length > 0) {
        //send the first child to the updateChildVisible function
        this.updateChildVisible(this.children[0], val);
      }
    }
  }

  get visible(): boolean {
    return this._visible;
  }

  set alpha(val) {
    if (this._alpha != val) {
      this._alpha = val;
      if (this.children.length > 0) {
        //send the first child to the updateChildalpha function
        this.updateChildAlpha(this.children[0], val);
      }
    }
  }

  get alpha(): number {
    return this._alpha;
  }

  setScrollFactor(scroll: any): void {
    //setScrollFactor
    if (this.children.length > 0) {
      //send the first child to the updateChildalpha function
      this.updateChildScroll(this.children[0], scroll);
    }
  }

  updateChildScroll(child: ChildObject, scroll: any): void {
    child.setScrollFactor(scroll);
    if (child.nextChild) {
      child.nextChild.setScrollFactor(scroll);
    }
  }

  updateChildAlpha(child: ChildObject, alpha: number): void {
    child.alpha = alpha;
    if (child.isPosBlock == true) {
      child.alpha = alpha;
    }
    if (child.nextChild != null) {
      //if the child has a nextChild call this function recursively
      this.updateChildAlpha(child.nextChild, alpha);
    }
  }

  updateChildVisible(child: ChildObject, visibility: boolean): void {
    child.visible = visibility;
    if (child.isPosBlock == true) {
      child.visible = visibility;
    }
    if (child.nextChild != null) {
      //if the child has a nextChild call this function recursively
      this.updateChildVisible(child.nextChild, visibility);
    }
  }

  updateChildPos(child: ChildObject): void {
    child.y = child.y - this._oldY + this._y;
    child.x = child.x - this._oldX + this._x;

    if (child.isPosBlock == true) {
      child.updatePositions();
    }

    if (child.nextChild != null) {
      //if the child has a nextChild call this function recursively
      this.updateChildPos(child.nextChild);
    }

    //set the old values to the new
    this._oldX = this._x;
    this._oldY = this._y;
  }

  updatePositions(): void {
    if (this.children) {
      if (this.children.length > 0) {
        //send the first child to the updateChildPos function
        this.updateChildPos(this.children[0]);
      }
    }
  }

  getRelPos(child: ChildObject): Position {
    return {
      x: child.x - this.x,
      y: child.y - this.y
    };
  }

  //   once(t, e, i) {}

  getChildren(myArray: any[], child: ChildObject): void {
    myArray.push(child);
    if (child.isPosBlock) {
      if (child.children.length > 0) {
        child.getChildren(myArray, child.children[0]);
      }
    }
    if (child.nextChild) {
      this.getChildren(myArray, child.nextChild);
    }
  }

  getAllChildren() {
    const childArray: any[] = [];
    if (this.children.length > 0) {
      this.getChildren(childArray, this.children[0]);
    }
    return childArray;
  }

  getChildAt(index: number): any {
    return this.children[index];
  }

  setMask(mask: any): void {
    this.getAllChildren().forEach(function (child: ChildObject) {
        child.setMask(mask);
      }.bind(this)
    );
  }

  destroy(): void {
    const childArray = this.getAllChildren();
    this.childIndex = -1;
    //console.log(childArray);
    const len = childArray.length;

    for (let i = 0; i < len; i++) {
      childArray[i].destroy();
    }

    this.children.length = 0;
    childArray.length = 0;
  }
}
