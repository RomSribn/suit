/* global clothesWidget3d */
/* eslint-disable */

const Widget3d = clothesWidget3d.default;
const widget3d = new Widget3d(document.getElementById('app'), {
    basePath: '',
    onClickAsset(data) {
        console.log('select', data);
        widget3d.select(data);
    }
});

window.addEventListener('resize', function() {
    widget3d.setCanvasSize(window.innerWidth, window.innerHeight);
});

fetch('scripts/view.json')
    .then(res => res.json())
    .then((assets) => {
        widget3d.update(assets);
    });