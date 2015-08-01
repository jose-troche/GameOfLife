function init(){

  var mat1 = [],
    size = 100,
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    ctxSize = canvas.width,
    factor = ctxSize/size,
    i,
    cnt = 0,
    delay = 800,
    maxCnt = 30;

  mat1 = seed();

  setTimeout(updateMatrix, delay);


  function updateMatrix(){
    mat1 = tick(mat1);

    cnt++;
    //console.log('Iteration: ', cnt);
    if (cnt<maxCnt){
     setTimeout(updateMatrix, delay);  
    }
  }

  function seed(){
    var m = [], r, c;
    for (r=0; r<size; r++){
      m[r] = [];
      for (c=0; c<size; c++){
        m[r][c] = Math.random() < .4 ? 0 : 1;
        if (m[r][c] === 1) {
          rect(r,c);
        }    
      }
    }
    return m;
  }

  function tick(m){
    var alive = 0, m2 = [], r, c;

    clearCanvas();
    canvas.style.opacity = 0.6;
    setTimeout(function(){canvas.style.opacity = 1;}, 300)
    for (r=0; r<size; r++){
      m2[r] = [];
      for (c=0; c<size; c++){
        alive = getAliveCount(m, r, c);
        if (m[r][c] === 1) {  // Current cell alive
          // Keep alive if 2 or 3 alive around, else die
          m2[r][c] = (alive === 2 || alive === 3) ? 1 : 0;
        }
        else {  // Current cell dead, gets alive if 3 alive around
          m2[r][c] = (alive === 3) ? 1 : 0;
        }
        if (m2[r][c] === 1) {
          rect(r,c);
        }    
      }
    } 
    return m2;
  }

  function getAliveCount(m, r, c){
    var i, j, alive = 0;
    for (i = r-1; i <= r+1; i++){
      for (j = c-1; j <= c+1; j++){
        if (i!=r && j!=c && m[adjustedCoord(i)][adjustedCoord(j)]==1){
          alive++;
        }
      }
    }
    return alive;
  }

  function adjustedCoord(coord){
    // Coordinates wrap around
    return (coord + size) % size;
  }

  function rect(r,c) {
    ctx.fillStyle = '#0066FF';
    ctx.fillRect(r*factor, c*factor, factor, factor);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, ctxSize, ctxSize);
  }

}


