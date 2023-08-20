const video = document.getElementById("camera");

const imageTag = document.getElementById("image");

console.log(window.electronAPI);

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
});
