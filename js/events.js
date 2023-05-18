StringArtGenerator.prototype.Clip=function(t,e,i){return e>i&&([e,i]=[i,e]),t>i?i:t<e?e:t},StringArtGenerator.prototype.NormalizePoint=function(){this.imgX=this.Clip(this.imgX,this.imgBbox.xmin,this.imgBbox.xmax-this.imgWidth*this.imgScale),this.imgY=this.Clip(this.imgY,this.imgBbox.ymin,this.imgBbox.ymax-this.imgHeight*this.imgScale)},StringArtGenerator.prototype.TouchToPoint=function(t){return{x:Math.round(t.clientX),y:Math.round(t.clientY)}},StringArtGenerator.prototype.GetPointDistance=function(t,e){let i=e.x-t.x,o=e.y-t.y;return Math.sqrt(i*i+o*o)},StringArtGenerator.prototype.MaxAbs=function(t,e){return Math.abs(t)>Math.abs(e)?t:e},StringArtGenerator.prototype.MouseDown=function(t){this.isPressed=!0,this.prevX=t.offsetX,this.prevY=t.offsetY,t.preventDefault()},StringArtGenerator.prototype.MouseMove=function(t){if(t.preventDefault(),!this.isPressed||this.isGenerating||this.isLineDrawing)return;let e=t.offsetX-this.prevX,i=t.offsetY-this.prevY;this.imgX+=e,this.imgY+=i,this.prevX=t.offsetX,this.prevY=t.offsetY,this.NormalizePoint(),this.DrawLoadedImage()},StringArtGenerator.prototype.MouseUp=function(t){t.preventDefault(),this.isPressed=!1},StringArtGenerator.prototype.MouseWheel=function(t){if(t.preventDefault(),this.isGenerating||this.isLineDrawing)return;let e=SCALES.indexOf(this.imgScale)-Math.sign(t.deltaY),i=SCALES[Math.max(0,Math.min(SCALES.length-1,e))];this.SetScale(i,t.offsetX,t.offsetY),this.NormalizePoint(),this.DrawLoadedImage()},StringArtGenerator.prototype.DragOver=function(t){this.dragDropBox.style.display="",t.preventDefault()},StringArtGenerator.prototype.DragLeave=function(t){this.dragDropBox.style.display="none",t.preventDefault()},StringArtGenerator.prototype.Drop=function(t){if(t.preventDefault(),this.dragDropBox.style.display="none",1!=t.dataTransfer.files.length)return void alert("Можно перетащить не более одного файла");let e=new Image;e.onload=()=>this.LoadImage(e),e.src=URL.createObjectURL(t.dataTransfer.files[0])},StringArtGenerator.prototype.TouchStart=function(t){if(t.preventDefault(),this.touches=[],1==t.targetTouches.length){let e=this.TouchToPoint(t.targetTouches[0]);t.offsetX=e.x,t.offsetY=e.y,this.MouseDown(t)}else 2==t.targetTouches.length&&(this.touches.push(this.TouchToPoint(t.targetTouches[0])),this.touches.push(this.TouchToPoint(t.targetTouches[1])))},StringArtGenerator.prototype.TouchMove=function(t){if(!this.isPressed||this.isGenerating||this.isLineDrawing)return;if(t.preventDefault(),1==t.targetTouches.length){let e=this.TouchToPoint(t.targetTouches[0]);return t.offsetX=e.x,t.offsetY=e.y,void this.MouseMove(t)}if(2!=t.targetTouches.length)return;let e=this.TouchToPoint(t.targetTouches[0]),i=this.TouchToPoint(t.targetTouches[1]),o=this.GetPointDistance(this.touches[0],this.touches[1]),r=this.GetPointDistance(e,i);Math.abs(r-o)>TOUCH_DELTA&&this.SetScale(this.imgScale*r/o,(e.x+i.x)/2,(e.y+i.y)/2);let s=e.x-this.touches[0].x,n=i.x-this.touches[1].x;Math.sign(s)==Math.sign(n)&&(this.imgX+=this.MaxAbs(s,n));let h=e.y-this.touches[0].y,a=i.y-this.touches[1].y;Math.sign(h)==Math.sign(a)&&(this.imgY+=this.MaxAbs(h,a)),this.touches=[e,i],this.NormalizePoint(),this.DrawLoadedImage()},StringArtGenerator.prototype.TouchEnd=function(t){t.preventDefault(),this.isPressed=!1};