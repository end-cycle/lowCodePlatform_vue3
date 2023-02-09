
const { exportHtmlHandle } = require('./exportHtml');

const views = [{ "focus": false, "component": "ButtonCom", "props": { "link": "#", "content": "按钮", "btnType": "button" }, "style": { "top": "", "left": "", "position": "static", "width": "75px", "height": "40px", "zIndex": 50 }, "btnStyle": { "fontSize": "14px", "lineHeight": "2px", "fontWeight": "400px", "color": "#FFF", "backgroundColor": "#409EFF", "opacity": 1, "borderRadius": "3px", "width": "75px", "height": "40px" }, "sonStyle": "btnStyle", "id": "rn2Bz3LQtB4UNg8ACPaTK" }];
test('jsonToHtml test', () => {
    expect(exportHtmlHandle(views, false)).toMatch(/按钮/);
});

