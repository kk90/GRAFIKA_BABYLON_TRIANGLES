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
var myparent;
function drawTriangle(x, y, trinagleSize) {
    var triangle = new BABYLON.Mesh('triangle' + x + y, sceneB);
    var material = new BABYLON.StandardMaterial("texture1", sceneB);
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
function Render() {
    myparent.rotation.z += 0.01;
    for (var i = 0; i < triangles.length; i++) {
        triangles[i].rotation.y += 0.01;
    }
    sceneB.render();
}
function drawOnePart(a, d, h, parent_) {
    for (var i = 0; i < 3; i++) {
        var tr1 = drawTriangle(i * d, 0, a);
        tr1.rotation.z = Math.PI / 4 * 5;
        tr1.parent = parent_;
        triangles.push(tr1);
    }
    for (var i = 0; i < 2; i++) {
        var tr1 = drawTriangle(d / 2 + i * d, h, a);
        tr1.rotation.z = Math.PI / 4 * 5;
        tr1.parent = parent_;
        triangles.push(tr1);
    }
    var tr1 = drawTriangle(d, h * 2, a);
    tr1.rotation.z = Math.PI / 4 * 5;
    tr1.parent = parent_;
    triangles.push(tr1);
}
function addTriangles() {
    var material = new BABYLON.StandardMaterial("texture2", sceneB);
    material.alpha = 0;
    var parents = [];
    var a = 2;
    var d = Math.sqrt(2 * (a * a));
    var h = Math.sqrt((a * a) - ((d / 2) * (d / 2)));
    myparent = BABYLON.Mesh.CreatePlane("myparent", 3 * d, sceneB, true);
    myparent.material = material;
    for (var i = 0; i < 4; i++) {
        parents.push(BABYLON.Mesh.CreatePlane("myparent" + i, 2, sceneB, true));
        parents[i].material = material;
        console.log("Add triangles");
        drawOnePart(a, d, h, parents[i]);
        parents[i].rotation.z = Math.PI / 2 * i;
        parents[i].parent = myparent;
    }
    parents[0].position.x -= d;
    parents[0].position.y -= 2 * h;
    parents[1].position.x += d;
    parents[1].position.y -= 2 * h;
    parents[2].position.y += 2 * h;
    parents[2].position.x += d;
    parents[3].position.y += 2 * h;
    parents[3].position.x -= d;
}
function init() {
    initScene();
    addTriangles();
    sceneB.render();
}
