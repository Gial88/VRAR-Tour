var container = document.querySelector('#container');
var panorama1 = new PANOLENS.ImagePanorama('images/images1.jpeg');
var panorama2 = new PANOLENS.ImagePanorama('images/images2.jpeg');
var viewer = new PANOLENS.Viewer({ container: container });
viewer.add(panorama1, panorama2);

var textureLoader = new THREE.TextureLoader();
var customInfospot = textureLoader.load('images/images1.jpeg', function () {
    var infospot = new PANOLENS.Infospot(500, 'images/images2.jpeg');
    infospot.position.set(0, -2000, -5000);
    infospot.addEventListener('click', function () {
        bar.classList.remove('hide');
        viewer.setPanorama(panorama2);
    });
    panorama1.add(infospot);
});

var bar = document.querySelector('#bar');
function onProgressUpdate(event) {
    var percentage = event.progress.loaded / event.progress.total * 100; 
    bar.style.width = percentage + "%";
    if (percentage >= 100) {
        bar.classList.add('hide'); 
        setTimeout(function () {
            bar.style.width = 0;
        }, 1000);
    }
}

var textureLoader2 = new THREE.TextureLoader();
var customInfospot2 = textureLoader.load('images/images2.jpeg', function () {
    var infospot = new PANOLENS.Infospot(500, 'images/images1.jpeg');
    infospot.position.set(0, -2000, -5000);
    infospot.addEventListener('click', function () {
        bar.classList.remove('hide');
        viewer.setPanorama(panorama1);
    });
    panorama2.add(infospot);
});
panorama1.addEventListener('progress', onProgressUpdate);
panorama2.addEventListener('progress', onProgressUpdate);