let MAX_LINES,pin_coords,lastStepImage,timerId,pinsOutput=[],selectCountLine=0,stepNumber=0,listenForKeys=!1,IMG_SIZE=500,N_PINS=240,MIN_LOOP=20,MIN_DISTANCE=20,LINE_WEIGHT=19,FILENAME="",SCALE=20,HOOP_DIAMETER=.625,pointIndex=0,lineCount=2,timer=5,timer_start=!1,previev=!0,j=0,ctx3=document.getElementById("canvasOutput3").getContext("2d"),canvas2=document.getElementById("canvasOutput2"),ctx2=canvas2.getContext("2d");infoBox=document.getElementById("info-box"),stepNumberViev=document.getElementById("step-number"),StartCreatingBtn=document.getElementById("start-creating-btn"),PrevievBtn=document.getElementById("previev-btn"),StepNext=document.getElementById("next-step-btn"),StepLast=document.getElementById("last-step-btn"),SelectStepBox=document.getElementById("select-step-box"),SelectStepBox.addEventListener("input",(()=>selectStepBox())),SelectStepBox.addEventListener("change",(()=>selectStepBox())),SelectStepValue=document.getElementById("select-step-value"),SelectStepValue.addEventListener("change",(()=>selectStepValue())),StepTimerBox=document.getElementById("step-timer-box"),StepTimerBox.addEventListener("input",(()=>stepTimerBox())),StepTimerBox.addEventListener("change",(()=>stepTimerBox())),StepTimerValue=document.getElementById("step-timer-value"),StepTimerValue.addEventListener("change",(()=>stepTimerValue())),StartStopTimer=document.getElementById("start-stop-timer"),StartStopTimer.addEventListener("click",(()=>startStopTimer())),logoBig=document.getElementById("logo-big"),logoBig.addEventListener("click",(()=>window.open("https://craftorika.com.ua"))),logoSmall=document.getElementById("logo-small"),logoSmall.addEventListener("click",(()=>window.location.href="https://craftorika.com.ua"));let controls=[SelectStepBox,SelectStepValue,StepTimerBox,StepTimerValue,StartStopTimer,StepNext,StepLast,StartCreatingBtn];function startStopTimer(){timer_start?(clearInterval(timerId),timer_start=!timer_start,StartStopTimer.value="Старт"):(timer_start=!timer_start,timer=StepTimerValue.value,StartStopTimer.value="Стоп",timerId=setInterval((()=>nextStep()),1e3*timer))}function stepTimerBox(){let e=StepTimerBox.value;StepTimerValue.value=`${e}`,startStopTimer(),startStopTimer()}function stepTimerValue(){let e=StepTimerValue.value;StepTimerBox.value=`${e}`,startStopTimer(),startStopTimer()}function selectStepBox(){localStorage.setItem("stepNumber",SelectStepValue.value),lineCount=SelectStepBox.value,SelectStepValue.value=`${lineCount}`,stepTo(lineCount)}function selectStepValue(){localStorage.setItem("stepNumber",SelectStepValue.value),lineCount=SelectStepValue.value,SelectStepBox.value=`${lineCount}`,stepTo(lineCount)}function startCreating(){stepNumber||alert("Завяжіть нитку на піну №60"),base_image2=new Image,ctx3.canvas.width=2*IMG_SIZE,ctx3.canvas.height=2*IMG_SIZE,ctx3.clearRect(0,0,2*IMG_SIZE,2*IMG_SIZE),ctx3.drawImage(base_image2,0,0,2*IMG_SIZE,2*IMG_SIZE),line_sequence=pinsOutput,pointIndex=0,null==pin_coords&&CalculatePins(),stepNumber?stepTo(stepNumber):nextStep(),listenForKeys=!0;for(let e of controls)e.removeAttribute("disabled")}function startDrawing(){PrevievBtn.value="Зупинити";for(let e of controls)e.setAttribute("disabled",!1);listenForKeys=!1,base_image2=new Image,ctx3.canvas.width=2*IMG_SIZE,ctx3.canvas.height=2*IMG_SIZE,ctx3.clearRect(0,0,2*IMG_SIZE,2*IMG_SIZE),ctx3.drawImage(base_image2,0,0,2*IMG_SIZE,2*IMG_SIZE),ctx2.clearRect(0,0,canvas2.width,canvas2.height),ctx2.save(),line_sequence=pinsOutput,pointIndex=0,null==pin_coords&&CalculatePins(),0!==j&&(previev=!previev),function e(){j<MAX_LINES-1&&previev?(pointIndex++,ctx3.beginPath(),ctx3.moveTo(2*pin_coords[line_sequence[pointIndex-1]][0],2*pin_coords[line_sequence[pointIndex-1]][1]),ctx3.lineTo(2*pin_coords[line_sequence[pointIndex]][0],2*pin_coords[line_sequence[pointIndex]][1]),ctx3.strokeStyle="black",ctx3.lineWidth=.3,ctx3.stroke(),j++,setTimeout(e,0)):(StartCreatingBtn.removeAttribute("disabled"),PrevievBtn.value="Демонстарція")}()}function nextStep(){if(pointIndex>MAX_LINES-1)return;let e,t;line_sequence[pointIndex],line_sequence[pointIndex+1];pointIndex>0&&(ctx3.clearRect(0,0,2*IMG_SIZE,2*IMG_SIZE),ctx3.putImageData(lastStepImage,0,0),ctx3.beginPath(),ctx3.moveTo(2*pin_coords[line_sequence[pointIndex-1]][0],2*pin_coords[line_sequence[pointIndex-1]][1]),ctx3.lineTo(2*pin_coords[line_sequence[pointIndex]][0],2*pin_coords[line_sequence[pointIndex]][1]),ctx3.strokeStyle="black",ctx3.lineWidth=.3,ctx3.stroke()),lastStepImage=ctx3.getImageData(0,0,2*IMG_SIZE,2*IMG_SIZE),pointIndex++,ctx3.beginPath(),ctx3.moveTo(2*pin_coords[line_sequence[pointIndex-1]][0],2*pin_coords[line_sequence[pointIndex-1]][1]),ctx3.lineTo(2*pin_coords[line_sequence[pointIndex]][0],2*pin_coords[line_sequence[pointIndex]][1]),ctx3.strokeStyle="#FF0000",ctx3.lineWidth=5,ctx3.stroke(),SetNumberToCanvas(),e=line_sequence[pointIndex]+61>240?line_sequence[pointIndex]+61-240:line_sequence[pointIndex]+61,t=line_sequence[pointIndex-1]+61>240?line_sequence[pointIndex-1]+61-240:line_sequence[pointIndex-1]+61,infoBox.innerHTML=`<h2>від ${t} до ${e}</h2>`,stepNumberViev.innerHTML=`<h1>від ${t} до ${e}</h1>`,SelectStepBox.value=pointIndex,SelectStepValue.value=pointIndex,localStorage.setItem("stepNumber",pointIndex)}function stepTo(e){if(pointIndex=e,pointIndex<2)return;pointIndex--,pointIndex--,ctx3.clearRect(0,0,2*IMG_SIZE,2*IMG_SIZE),ctx2.clearRect(0,0,1100,1100);let t,n;line_sequence[pointIndex],line_sequence[pointIndex+1];for(i=0;i<pointIndex;i++)ctx3.beginPath(),ctx3.moveTo(2*pin_coords[line_sequence[i]][0],2*pin_coords[line_sequence[i]][1]),ctx3.lineTo(2*pin_coords[line_sequence[i+1]][0],2*pin_coords[line_sequence[i+1]][1]),ctx3.strokeStyle="black",ctx3.lineWidth=.35,ctx3.stroke();lastStepImage=ctx3.getImageData(0,0,2*IMG_SIZE,2*IMG_SIZE),pointIndex++,ctx3.beginPath(),ctx3.moveTo(2*pin_coords[line_sequence[pointIndex-1]][0],2*pin_coords[line_sequence[pointIndex-1]][1]),ctx3.lineTo(2*pin_coords[line_sequence[pointIndex]][0],2*pin_coords[line_sequence[pointIndex]][1]),ctx3.strokeStyle="#FF0000",ctx3.lineWidth=5,ctx3.stroke(),SetNumberToCanvas(),t=line_sequence[pointIndex]+61>240?line_sequence[pointIndex]+61-240:line_sequence[pointIndex]+61,n=line_sequence[pointIndex-1]+61>240?line_sequence[pointIndex-1]+61-240:line_sequence[pointIndex-1]+61,infoBox.innerHTML=`<h2>від ${n} до ${t}</h2>`,stepNumberViev.innerHTML=`<h1>від ${n} до ${t}</h1>`}function lastStep(){if(pointIndex<2)return;pointIndex--,pointIndex--,ctx3.clearRect(0,0,2*IMG_SIZE,2*IMG_SIZE);let e,t;line_sequence[pointIndex],line_sequence[pointIndex+1];for(i=0;i<pointIndex;i++)ctx3.beginPath(),ctx3.moveTo(2*pin_coords[line_sequence[i]][0],2*pin_coords[line_sequence[i]][1]),ctx3.lineTo(2*pin_coords[line_sequence[i+1]][0],2*pin_coords[line_sequence[i+1]][1]),ctx3.strokeStyle="black",ctx3.lineWidth=.3,ctx3.stroke();lastStepImage=ctx3.getImageData(0,0,2*IMG_SIZE,2*IMG_SIZE),pointIndex++,ctx3.beginPath(),ctx3.moveTo(2*pin_coords[line_sequence[pointIndex-1]][0],2*pin_coords[line_sequence[pointIndex-1]][1]),ctx3.lineTo(2*pin_coords[line_sequence[pointIndex]][0],2*pin_coords[line_sequence[pointIndex]][1]),ctx3.strokeStyle="#FF0000",ctx3.lineWidth=5,ctx3.stroke(),SetNumberToCanvas(),e=line_sequence[pointIndex]+61>240?line_sequence[pointIndex]+61-240:line_sequence[pointIndex]+61,t=line_sequence[pointIndex-1]+61>240?line_sequence[pointIndex-1]+61-240:line_sequence[pointIndex-1]+61,infoBox.innerHTML=`<h2>від ${t} до ${e}</h2>`,stepNumberViev.innerHTML=`<h1>від ${t} до ${e}</h1>`,SelectStepBox.value=pointIndex,SelectStepValue.value=pointIndex,localStorage.setItem("stepNumber",pointIndex)}function CalculatePins(){for(pin_coords=[],center=IMG_SIZE/2,radius=IMG_SIZE/2-.5,i=0;i<N_PINS;i++)angle=2*Math.PI*i/N_PINS,pin_coords.push([Math.floor(center+radius*Math.cos(angle)),Math.floor(center+radius*Math.sin(angle))])}function SetNumberToCanvas(){ctx2.clearRect(0,0,canvas2.width,canvas2.height),ctx2.save(),ctx2.translate(canvas2.width/2,canvas2.width/2);for(var e=0;e<240;e++){var t=225*Math.cos(e/240*2*Math.PI),n=225*Math.sin(e/240*2*Math.PI);if(e===line_sequence[pointIndex]){let i;ctx2.fillStyle="black",ctx2.font="bold 28px Arial",ctx2.textAlign="center",ctx2.textBaseline="middle",i=e+61>240?e+61-240:e+61,ctx2.fillText(i,t,n),ctx2.restore()}}ctx2.restore()}pinsOutput=JSON.parse(localStorage.getItem("path")),selectCountLine=localStorage.getItem("selectCountLine"),stepNumber=localStorage.getItem("stepNumber"),pinsOutput?(MAX_LINES=selectCountLine,SelectStepValue.setAttribute("max",MAX_LINES),SelectStepBox.setAttribute("max",MAX_LINES)):SelectStepValue.value=2,stepNumber&&(startCreating(),SelectStepBox.value=stepNumber,SelectStepValue.value=stepNumber,stepTo(stepNumber)),document.body.onkeydown=function(e){listenForKeys&&(32==e.keyCode||39==e.keyCode?nextStep():37==e.keyCode&&lastStep())};
