var canvas, stage;
var drawingCanvas;
var oldPt;
var oldMidPt;
var title;
var color;
var stroke;
var colors;
var index;
var gestureStart, gestureContainer, gestureShape;
var inGesture = false;
var gestureStartX = 200, gestureStartY = 200, gestureEndX = 400, gestureEndY = 350, gestureRadius = 45;

function init() {
    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }
    canvas = document.getElementById("myCanvas");
    index = 0;
    colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

    //check to see if we are running in a browser with touch support
    stage = new createjs.Stage(canvas);
    stage.autoClear = false;
    stage.enableDOMEvents(true);

    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(24);

    gestureContainer = new createjs.Container();
    stage.addChild(gestureContainer);

    gestureStart = new createjs.Graphics()
        .setStrokeStyle(gestureRadius)
        .beginStroke("000")
        .beginFill("000")
        .drawCircle(gestureStartX,gestureStartY,12) // can't get this to look right...
        .lt(gestureEndX,gestureEndY);

    gestureShape = new createjs.Shape(gestureStart);

    gestureContainer.addChild(gestureShape);

    stage.addChild(gestureContainer);
    stage.update();

    // drawingCanvas = new createjs.Shape();

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);

    // title = new createjs.Text("Click and Drag to draw", "36px Arial", "#777777");
    // title.x = 300;
    // title.y = 200;
    // stage.addChild(title);

    // stage.addChild(drawingCanvas);
    // stage.update();
}

function stop() {}

function handleMouseDown(event) {

    console.info(stage.mouseX + " " + stage.mouseY);

    if (Math.abs(stage.mouseX - gestureStartX) < gestureRadius && Math.abs(stage.mouseY - gestureStartY) < gestureRadius) {
        console.log("HIT!");
        inGesture = true;
        stage.addEventListener("stagemousemove" , handleMouseMove);
    } else {
        inGesture = false;
    }
}

function handleMouseMove(event) {
    if (gestureShape.hitTest(stage.mouseX, stage.mouseY) && inGesture) {
        console.log("dragggginnnn");
    } else {
        inGesture = false;
    }
}

function handleMouseUp(event) {

    console.info(stage.mouseX + " " + stage.mouseY);

    if (Math.abs(stage.mouseX - gestureEndX) < gestureRadius && Math.abs(stage.mouseY - gestureEndY) < gestureRadius && inGesture) {
        console.log("HIT!");

        gestureStart.c()
            .ss(gestureRadius)
            .s("a3f")
            .f("f3a")
            .dc(gestureStartX,gestureStartY,5)
            .lt(gestureEndX,gestureEndY)
            .ef();

        stage.update();
    } else {
        inGesture = false;
    }

    stage.removeEventListener("stagemousemove" , handleMouseMove);
}