const canvas = document.getElementById("JSCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");


canvas.width = 700;
canvas.height = 700;
ctx.strokeStyle = "#000000";
ctx.lineWidth = 2.5;

let painting = false; 

function handleRangeChange(event)  {
    const size = event.target.value;
    ctx.lineWidth = size;
}


function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseDown(event) {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const colors = event.target.style.backgroundColor;
    ctx.strokeStyle = colors;
    ctx.fillStyle = colors;
  }

function handleBackgroundColordragend(event) {
    
    const CANVAS_SIZE = 700;
    ctx.fillStyle = event.target.style.backgroundColor;
    ctx.fillRect(0, 0, 700, 700);
}
document.addEventListener("dragend", handleBackgroundColordragend);
 
function handlemousecursor(event) {
    event.preventDefault();
}
function handlemousecursor2(event) {
    event.preventDefault();
}
canvas.addEventListener("dragover", handlemousecursor);
canvas.addEventListener("dragleave", handlemousecursor2);



if (canvas)  {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

if(range) {
    range.addEventListener("input", handleRangeChange);
}



Array.from(colors).forEach(color => {
    color.addEventListener("click", handleColorClick);
    // color.addEventListener("drag", handleBackgroundColorClick);   
}
);


color_picker = document.getElementById("color_picker");
color_id = document.getElementById("color_id");
color_picker.onmousedown = select_color;
color_picker_add();

function color_picker_add() {
	color_picker_ = color_picker.getContext("2d"),
  center_x = (color_picker.width)/2,
  center_y = (color_picker.height)/2,
  sx = center_x,
  sy = center_y;
	palette = new color_picker_element(center_x, center_y, sx, sy);
	palette.draw();
}

function select_color(e) {
  var x = e.pageX - color_picker.offsetLeft,
      y = e.pageY - color_picker.offsetTop,   
      pixel = color_picker.getContext("2d").getImageData(x, y, 1, 1).data,
	    pixelColor = "rgb(" + pixel[0] + ", " + pixel[1]+", "+ pixel[2]+ ")";
	color_id.style.backgroundColor = pixelColor;
}

function color_picker_element(center_x, center_y, sx, sy) {
	this.center_x = center_x;
	this.center_y = center_y;
	this.sx = sx;
	this.sy = sy;
	this.draw = function() {
		for(var i = 0; i < 360; i+=0.1)
		{
			var rad = (i-45) * (Math.PI) / 180;
			color_picker_.strokeStyle = "hsla("+i+", 100%, 50%, 1.0)";
			color_picker_.beginPath();
			color_picker_.moveTo(center_x, center_y);
			color_picker_.lineTo(center_x + sx * Math.cos(-rad), center_y + sy * Math.sin(-rad));
			color_picker_.stroke();	
		}
	}
}