var sceneB;
var triangles = [];
var definedColors = [
    new BABYLON.Color3(1.0, 0.0, 0.0),
    new BABYLON.Color3(0.0, 1.0, 0.0),
    new BABYLON.Color3(0.0, 0.0, 1.0),
    new BABYLON.Color3(0.5, 1.0, 0.0),
    new BABYLON.Color3(0.0, 0.5, 0.1),
    new BABYLON.Color3(1.0, 0.0, 0.5)
];
var mainparent;
var outerparent;
var innerparent;
var outerdelta = 0.008;
var a = 2;
var d = Math.sqrt(2 * (a * a));
var h = Math.sqrt((a * a) - ((d / 2) * (d / 2)));
var delta = (outerdelta / (Math.PI * 2)) / 10 * 3 * a;
function calculateFactors() {
    outerdelta = parseFloat(document.getElementById("speed").value);
    a = 2;
    d = Math.sqrt(2 * (a * a));
    h = Math.sqrt((a * a) - ((d / 2) * (d / 2)));
    delta = (outerdelta / (Math.PI * 2)) / 10 * 3 * a;
}
function drawTriangle(x, y, trinagleSize, isInner) {
    if (isInner === void 0) { isInner = "0"; }
    var triangle = new BABYLON.Mesh(isInner, sceneB);
    var material = new BABYLON.StandardMaterial("material1", sceneB);
    material.diffuseColor = definedColors[Math.floor(((Math.random() * (definedColors.length - (0)))))];
    var positions = [
        0,
        0,
        0,
        0,
        0 + trinagleSize,
        0,
        0 + trinagleSize,
        0,
        0
    ];
    var normals = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
    ];
    var indices = [];
    indices.push(0);
    indices.push(1);
    indices.push(2);
    triangle.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions, true);
    triangle.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals, true);
    triangle.setIndices(indices);
    triangle.material = material;
    triangle.material.backFaceCulling = false;
    triangle.position.x = x;
    triangle.position.y = y;
    return triangle;
}
function initScene() {
    var canvas = document.getElementById('babylonCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    sceneB = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 20, BABYLON.Vector3.Zero(), sceneB);
    camera.attachControl(canvas, false);
    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(1000, 3, 0), sceneB);
    engine.runRenderLoop(Render);
}
function moveForward(triangle_) {
    switch (triangle_.name) {
        case "10":
            triangle_.position.y -= delta;
            triangle_.position.x -= delta;
            break;
        case "20":
            triangle_.position.y += delta;
            triangle_.position.x -= delta;
            document.getElementById("distance").innerHTML = (Math.floor(triangle_.position.y / (a) * 100) / 100).toString();
            break;
        case "30":
            triangle_.position.x -= delta;
            triangle_.position.y += delta;
            break;
        case "40":
            triangle_.position.x += delta;
            triangle_.position.y += delta;
            break;
        case "11":
            triangle_.position.y -= delta;
            triangle_.position.x += delta;
            break;
        case "21":
            triangle_.position.y += delta;
            triangle_.position.x += delta;
            break;
        case "31":
            triangle_.position.x -= delta;
            triangle_.position.y -= delta;
            break;
        case "41":
            triangle_.position.x += delta;
            triangle_.position.y -= delta;
            break;
    }
}
function Render() {
    outerparent.rotation.z += outerdelta;
    innerparent.rotation.z -= outerdelta * 3;
    for (var i = 0; i < triangles.length; i++) {
        if (triangles[i].name != "0") {
            moveForward(triangles[i]);
        }
    }
    var rotations = outerparent.rotation.z / (Math.PI * 2);
    var rotations2 = innerparent.rotation.z / (Math.PI * 2);
    document.getElementById("rotations").innerHTML = (Math.floor(rotations * 100) / 100).toString();
    document.getElementById("rotationsinner").innerHTML = (Math.floor(rotations2 * 100) / 100).toString();
    sceneB.render();
}
function drawOnePart(a, d, h, x, y, angle) {
    if (angle == Math.PI / 4 * 5) {
        for (var i = 0; i < 3; i++) {
            var tr1 = drawTriangle(x + i * d, y, a);
            tr1.rotation.z = angle;
            tr1.parent = outerparent;
            triangles.push(tr1);
        }
        for (var i = 0; i < 2; i++) {
            var tr1 = drawTriangle(x + d / 2 + i * d, y + h, a, "1" + i);
            tr1.rotation.z = angle;
            tr1.parent = innerparent;
            triangles.push(tr1);
        }
        var tr1 = drawTriangle(x + d, y + h * 2, a);
        tr1.rotation.z = angle;
        triangles.push(tr1);
    }
    else if (angle == Math.PI / 4) {
        for (var i = 0; i < 3; i++) {
            var tr1 = drawTriangle(x + i * d, y, a);
            tr1.rotation.z = angle;
            tr1.parent = outerparent;
            triangles.push(tr1);
        }
        for (var i = 0; i < 2; i++) {
            var tr1 = drawTriangle(x + d / 2 + i * d, y - h, a, "2" + i);
            tr1.rotation.z = angle;
            tr1.parent = innerparent;
            triangles.push(tr1);
        }
        var tr1 = drawTriangle(x + d, y - h * 2, a);
        tr1.rotation.z = angle;
        triangles.push(tr1);
    }
    else if (angle == Math.PI / 4 * 3) {
        for (var i = 0; i < 3; i++) {
            var tr1 = drawTriangle(x, y - i * d, a);
            tr1.rotation.z = angle;
            tr1.parent = outerparent;
            triangles.push(tr1);
        }
        for (var i = 0; i < 2; i++) {
            var tr1 = drawTriangle(x + h, y - (d / 2 + i * d), a, "3" + i);
            tr1.rotation.z = angle;
            tr1.parent = innerparent;
            triangles.push(tr1);
        }
        var tr1 = drawTriangle(x + h * 2, y - d, a);
        tr1.rotation.z = angle;
        triangles.push(tr1);
    }
    else if (angle == Math.PI / 4 * 7) {
        for (var i = 0; i < 3; i++) {
            var tr1 = drawTriangle(x, y - i * d, a);
            tr1.rotation.z = angle;
            tr1.parent = outerparent;
            triangles.push(tr1);
        }
        for (var i = 0; i < 2; i++) {
            var tr1 = drawTriangle(x - h, y - (d / 2 + i * d), a, "4" + i);
            tr1.rotation.z = angle;
            tr1.parent = innerparent;
            triangles.push(tr1);
        }
        var tr1 = drawTriangle(x - h * 2, y - d, a);
        tr1.rotation.z = angle;
        triangles.push(tr1);
    }
}
function addTriangles() {
    var material = new BABYLON.StandardMaterial("texture2", sceneB);
    material.alpha = 0;
    mainparent = BABYLON.Mesh.CreatePlane("myparent", 3 * d, sceneB, true);
    mainparent.material = material;
    outerparent = BABYLON.Mesh.CreatePlane("myparent", 3 * d, sceneB, true);
    outerparent.material = material;
    innerparent = BABYLON.Mesh.CreatePlane("myparent", 3 * d, sceneB, true);
    innerparent.material = material;
    outerparent.parent = mainparent;
    innerparent.parent = mainparent;
    drawOnePart(a, d, h, -d, -2 * h, Math.PI / 4 * 5);
    drawOnePart(a, d, h, -d, 2 * h, Math.PI / 4);
    drawOnePart(a, d, h, -d, 2 * h, Math.PI / 4 * 3);
    drawOnePart(a, d, h, d, 2 * h, Math.PI / 4 * 7);
}
function init() {
    initScene();
    addTriangles();
    sceneB.render();
}
