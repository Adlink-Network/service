class CreativeHelper {
  __creative;

  constructor(creative) {
    this._creative = creative;
  }

  showBrand(showBrand = true) {
    this._creative.showBrand = showBrand;
    return this;
  }

  hasCloseButton(hasCloseButton = true) {
    this._creative.hasCloseButton = hasCloseButton;
    return this;
  }

  brand(showBrand = true, hasCloseButton = true) {
    const closeButton = `<a href="javascript:void(0);" style="position:absolute;top:0;right:0;background:#FAFAFA;text-decoration:none;display:flex;justify-content:center;align-items:center;width: 21px;height: 21px;">
      <span style="font-size: 15px;color: #ccc;">×</span>
    </a>`;

    return !showBrand ? "" : `
    <style>#display-brand:hover > #brand-text {display:block!important;}</style>
    <div style="position:relative;margin:0 auto;width:300px;height:auto;">
      ${hasCloseButton ? closeButton : ""}
    </div>`;
  }


  withSize() {
    const [width, height] = this._creative.size.split("x");
    this._creative = {
      ...this._creative,
      width: parseInt(width) ?? 1,
      height: parseInt(height) ?? 1,
    };
    return this;
  }

  toHTML() {
    return `<!DOCTYPE html><html lang="en"><body>${this.brand(this._creative.showBrand, this._creative.hasCloseButton)} ${this._creative.code}</body></html>`;
  }

  toValue() {
    return {
      html: this.toHTML(),
      size: this._creative.size,
      width: this._creative.width,
      height: this._creative.height,
    };
  }
}

module.exports = CreativeHelper;
