var widgets = {};

function registerWidget(id, widget) {
    widgets[id] = widget;
}

function translateHTML(obj) {
    var objs, objPaths;
    
    objs = obj.page.diagram.objects;
    objPaths = obj.objectPaths;

    for(let i = 0; i < objs.length; i++) {
        let idMap, id, type, location, size, interactionMap, view;

        idMap = objs[i].id;
        id = objPaths[idMap].scriptId;
        type = objs[i].type;
        location = objs[i].style.location;
        size = objs[i].style.size;
        interactionMap = objs[i].interactionMap;

        if(type === "textBox") {
            view = new TextView();
        } else if(type === "radioButton") {
            view = new RadioButtonView();
        } else if(type === "checkbox") {
            view = new CheckboxView();
        } else if(type === "table") {
            view = new TableView();
        } else if(type === "button") {
            view = new HtmlButtonView();
        } else if(type === "treeNodeObject") {
            view = new TreeView();
        } else if(type === "vectorShape") {
            var dom = $("#" + id);
            // 判断是否为按钮
            if(dom.hasClass("button") || dom.hasClass("primary_button") || dom.hasClass("link_button")) {
                view = new ButtonView();
            } else if(dom.hasClass("box_1") || dom.hasClass("box_2") || dom.hasClass("box_3")) {
                view = new CompositeView();
            } else if(dom.hasClass("heading_1") || dom.hasClass("heading_2") || dom.hasClass("heading_3")) {
                view = new LabelView();
            }
        }

        if(view != undefined) {

            view.setId(id);
            view.setLocation(location);
            view.setSize(size);

            if(interactionMap != undefined) {
                for(let actionName in interactionMap) {
                    let action = interactionMap[actionName];
                    let cases = action.cases;
                    for(let j = 0; j < cases.length; j++) {
                        let actions = cases[j].actions;
                        for(let k = 0; k < actions.length; k++) {
                            view.bindEvent(actionName, actions[k]);
                        }
                    }
                }
            }
            view.layout(objs[i], objPaths);
            registerWidget(id, view);
            // layout(view);
        }
    }
}

translateHTML(domObject);
console.log(widgets);