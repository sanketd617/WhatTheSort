function getStyle(elem, prop) {
    return window.getComputedStyle(elem, null).getPropertyValue("width")
}
