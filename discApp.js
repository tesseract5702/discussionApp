let temp=[];
let responseIndex=0;
const submitBtn = document.getElementById("submitBtn");
const newQform = document.getElementById("newQBtn");
const secndRow = document.getElementById("scndRow");
let subjBox = document.getElementById("subBox");
let inptName = document.getElementById("inptName");
let textArea = document.getElementById("txtarea");
//Need the element to point the event through it:
let  rightPan= document.getElementById("rightPaneId")
let leftPan = document.getElementById("leftPaneId");
//aftrLftPaneContent
let afterLeftPan = document.getElementById("aftrLftPaneContent");
//new que form btn
let newQbtn = document.getElementById("newQBtn");
//left Pane div
let afterleftPanDiv = document.getElementById("afterLeftPane");
//Submit btn of response 
let submitBtnRes = document.getElementById("submitResId");
//Get response as user name
let resName = document.getElementById("nameRes");
//Getting text area tag of response section
let txtareaResp=document.getElementById("txtareaRes");
//Response UI block
let respBlock = document.getElementById("resShowBlock");
var arr = JSON.parse(localStorage.getItem("queObj")) || [];
var responseArr = JSON.parse(localStorage.getItem("resObj")) || [];
//console.log(responseArr);
// let oldData = JSON.parse(localStorage.getItem("queObj"));
// console.log(oldData);
//For getting the responses already in local storage
// console.log(responseArr.questionId);
//Getting the resolve button for the event handling mechanism
let resolveButton = document.getElementById("resolveId");
//Getting search box 
let srchBox=document.getElementById("srchBox");



//sorting the parsed object
arr.sort((a,b)=>{
        return b.likeCount-a.likeCount; 
});
console.log(arr);
localStorage.setItem("queObj",JSON.stringify(arr));

if(arr!=[])
    {
        arr.forEach(function(data)
        {
            // console.log(data);
            if(data.question != "")
            {
                input(data);
            }
            
        });
    };

if(arr != [])
{
   arr.forEach((data)=>{
    ind=data.index+1;
   });
}
submitBtn.addEventListener("click",function()
{
    //Adding a key id in the object for always getting different id
    if(textArea.value!="" && subjBox.value && textArea.value.replace(/\s/g, '').length && subjBox.value.replace(/\s/g, '').length)
    {
        var ind =  parseInt(localStorage.getItem("id")||"0");
        let obj = {
            index:null,
            subject:null,
            question:null,
            likeCount:0,
            dislikeCount:0
        };
        obj.index=ind++;
        localStorage.setItem("id",ind.toString());
        
        obj.subject=subjBox.value;
        obj.question=textArea.value;
        subjBox.value=null;
        textArea.value=null;
        //localStorage.setItem("queObj",JSON.stringify(obj));
        // var arr = JSON.parse(localStorage.getItem("queObj")) || [];
        let a = JSON.parse(localStorage.getItem("queObj"))|| [];
        a.push(obj);
        localStorage.setItem("queObj",JSON.stringify(a));
        // localStorage.getItem("queObj");
        console.log(a);
        a.sort((a,b)=>{
            return b.likeCount-a.likeCount; 
        });
        secndRow.innerHTML="";
        if(obj.question != "")
        {
            a.forEach(function(data)
            {
                input(data);
            })
        } 
    }
    else{
        alert("Please enter valid data!");
    }
});

submitBtnRes.addEventListener("click",function()
{  
    if(resName.value!="" && txtareaResp.value && resName.value.replace(/\s/g, '').length && txtareaResp.value.replace(/\s/g, '').length) 
    {
        let objRes={
            questionId:null,
            indexRespnse:null,
            userNm:null,
            res:null,
        };
        objRes.questionId=submitBtnRes.value;
        //console.log(objRes.questionId);
        //objRes.indexRespnse=ind++;
        objRes.userNm=resName.value;
        objRes.res=txtareaResp.value;
        resName.value=null;
        txtareaResp.value=null;
        localStorage.setItem("resObj",JSON.stringify(objRes));
        let b = JSON.parse(localStorage.getItem("resObj"));
        if(objRes.res != "")
        {
            inputRes(b);
        }
        
        responseArr.push(objRes);
        localStorage.setItem("resObj",JSON.stringify(responseArr));
    }
    else
    {
        alert("Please enter valid value!");
    }
    
});

    resolveButton.addEventListener("click",function()
    {
        let arr = JSON.parse(localStorage.getItem("queObj")) || [];
        
                
          arr= arr.filter(function(x)
            {
                return resolveButton.value != x.index
                
            });
        //console.log(arr);
        localStorage.setItem("queObj",JSON.stringify(arr));
        let arrayAfterResolve = JSON.parse(localStorage.getItem("queObj"));
        arrayAfterResolve.sort((a,b)=>{
            return b.likeCount-a.likeCount; 
        });
        secndRow.innerHTML="";
        arrayAfterResolve.forEach(function(data)
        {
            input(data);
        });
        afterleftPanDiv.style.display="none";
        rightPan.style.display="block";
        afterLeftPan.removeChild(afterLeftPan.firstElementChild);
        afterLeftPan.removeChild(afterLeftPan.firstElementChild);
        //location.reload();
    });

function input(val)
{
    let divIn = document.createElement("div");
    divIn.style.backgroundColor = "whitesmoke";
    let divOut = document.createElement("div");
    let subHead = document.createElement("h3");
    let likeButton = document.createElement("i");
    let spanlike = document.createElement("span");
    spanlike.innerText=val.likeCount;
    let spanDislike = document.createElement("span");
    spanDislike.innerText=val.dislikeCount;
    likeButton.style.padding = "5px";
    let dislikeButton = document.createElement("i");
    dislikeButton.style.padding = "5px";
    likeButton.classList.add("fa", "fa-thumbs-up","fa-lg" ,"text-success");
    likeButton.setAttribute("id","likeButtonId");
    dislikeButton.setAttribute("id","disklikeButtonId");
    dislikeButton.classList.add("fa","fa-thumbs-down","fa-lg","text-danger");
    subHead.innerText=val.subject;
    let para = document.createElement("h6");
    para.innerText=val.question;
    let brkLine = document.createElement("hr");
    divIn.appendChild(subHead);
    divIn.appendChild(para);
    divIn.appendChild(likeButton);
    divIn.appendChild(spanlike);
    divIn.appendChild(dislikeButton);
    divIn.appendChild(spanDislike);
    divIn.appendChild(brkLine);
    secndRow.appendChild(divIn);
    secndRow.appendChild(divOut);

    //Adding Clicking functionality for left Pane:
    divIn.addEventListener("click",function()
    {
        respBlock.innerHTML="";
        afterLeftPan.innerHTML="";
        rightPan.style.display="none";
        afterleftPanDiv.style.display="block";
        inputLftPan(val);
        submitBtnRes.value=val.index;
        resolveButton.value=val.index;
        responseArr.forEach(function(data)
        {
            if(submitBtnRes.value == data.questionId)
            {
                inputRes(data);
            }
        })
        
    });
    //Adding evnt listener for New Ques form button 
    newQbtn.addEventListener("click",function()
    {
        afterleftPanDiv.style.display="none";
        rightPan.style.display="block";
        afterLeftPan.removeChild(afterLeftPan.firstElementChild);
        afterLeftPan.removeChild(afterLeftPan.firstElementChild);
    });

    likeButton.addEventListener("click",function()
    {
        //val.likeCount++;
        // let array = JSON.parse(localStorage.getItem("queObj"));
        // console.log(array);
        let arr = JSON.parse(localStorage.getItem("queObj"));
        arr.forEach(function(data)
        {
            //Matching the question index and increasing it's like count
            if(val.index == data.index)
            {
                data.likeCount++;
                localStorage.setItem("queObj",JSON.stringify(arr));
                //console.log(array[val.index]);
            }
        });
        spanlike.innerText=val.likeCount;
        arr.sort((a,b)=>{
            return b.likeCount-a.likeCount; 
        });
        console.log(arr);
        secndRow.innerHTML="";
        arr.forEach(function(data)
        {
            input(data);
        });
        //location.reload();
    });
    dislikeButton.addEventListener("click",function()
    {
        val.dislikeCount++;
        let array = JSON.parse(localStorage.getItem("queObj"));
        console.log(array);
        array.forEach(function(data)
        {
            if(val.index == data.index)
            {
                data.dislikeCount++;
                localStorage.setItem("queObj",JSON.stringify(array));
                console.log(array[val.index]);
            }
        });
        spanDislike.innerText=val.dislikeCount;
    });
    

}
//Putting the question on the left pane
function inputLftPan(val)
{
    let subHead2 = document.createElement("h2");
    subHead2.innerHTML=val.subject;
    let para2 = document.createElement("h6");
    para2.innerHTML=val.question;
    afterLeftPan.appendChild(subHead2);
    afterLeftPan.appendChild(para2);
    inptName.innerHTML=` <input id="nameRes" type="text" placeholder="Enter Name" style="margin-top: 2vh; margin-bottom: 2vh;">
    <textarea class="w-75" name="" id="txtareaRes" cols="80" rows="7" placeholder="Enter Comment"></textarea>
    `;
}
//Puttin the response on UI
function inputRes(val)
{
    let horLn = document.createElement("hr");
    let h5 = document.createElement("h5");
    let paraRes = document.createElement("p");
    h5.innerText=val.userNm;
    paraRes.innerText=val.res;
    respBlock.appendChild(h5);
    respBlock.appendChild(paraRes);
    respBlock.appendChild(horLn);
}


//Search Logic
srchBox.addEventListener("keyup",function()
{
    let srchVal = srchBox.value.toLowerCase();
    let arrayAfterResolve = JSON.parse(localStorage.getItem("queObj"));
    
    arrayAfterResolve.sort((a,b)=>{
        return b.likeCount-a.likeCount; 
    });
    console.log(arrayAfterResolve);
    let tempSearchVal = arrayAfterResolve.filter(function(data)
    {
        let lowerCaseSubject = data.subject.toLowerCase();
        let lowerCaseQuestion = data.question.toLowerCase();
        //The logic of sorting and filtering out the unecessary data
        if(lowerCaseSubject.includes(srchVal) && lowerCaseSubject!="" || lowerCaseQuestion.includes(srchVal) && lowerCaseQuestion!="")
        {
            return data;
        }
    })
    secndRow.innerHTML="";
    tempSearchVal.forEach(function(data)
    {
        input(data);
    })
});

