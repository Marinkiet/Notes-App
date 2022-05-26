//get all elements
const addBox= document.querySelector(".add-box");                       //add new note box
 popupBox= document.querySelector(".popup-box");                        //pop updialog note box
 popupTitle= document.querySelector("header p");                        //Add new note title
 closeIcon= popupBox.querySelector("header i");                         //'x' icon on popup box
 addBtn = popupBox.querySelector("button");                             //"add note" button
 titleTag = popupBox.querySelector("input");                            //title input for note
 desciptionTag =popupBox.querySelector("textarea");                     //description text area for note

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];       //months array
const notes = JSON.parse(localStorage.getItem("notes")||"[]");                                  //get notes as an array
let isUpdate = false,updatedId;                                                                 //keep update off and assign id of it

function showNotes(){                                                                           //create dom elements for each new note
    document.querySelectorAll(".note").forEach(note=>note.remove());                            //
    notes.forEach((note,index) => {                                                             //create varaiable for each note created with its index
        let liTag = `<li class="note">                                                          
                    <div class="details">
                        <p>${note.title}</p>
                        <span>${note.description}</span>
                    </div>
                    <div class="bottom-content">
                        <span>${note.date}</span>
                        <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                            <li onclick="updateNote(${index},'${note.title}','${note.description}')"><i class="uil uil-pen">Edit</i></li>
                            <li onclick="deleteNote(${index})"><i class="uil uil-trash">Delete</i></li>
                        </ul>
                    </div>
                    </div>`
                    addBox.insertAdjacentHTML("afterend",liTag);                                //append new note after last
    });

}
showNotes();                                                //display the newly created note

function showMenu(El){                                      //show options to delete and edit note pass the note
    //console.log(El.parent);
    El.parentElement.classList.add("show");                 //add show class to elippsis and edit icons
    document.addEventListener("click",e=>{                  //on click of edit/delete icon/text then...
        console.log("tag name: "+ e.target.tagName);
        console.log("the el"+El)
        if(e.target.tagName != "I" || e.target != El){      //if user doent click on any of icons or icon text description then...
            El.parentElement.classList.remove("show");      //hide the menu with edit/delete options
        }
    });

}

function updateNote(noteId,title,description){              //update each note's title or/and description based on id
    isUpdate=true;                                          //let update be true if this is called
    updatedId = noteId;                                     //pass the specific note being edited id
    addBox.click();                                         //automatiically open popup box
    addBtn.innerText = "Update Note";                       //change/update the lable/text of button to Update + name of note selected
    popupTitle.innerText = "Update: " + title;              //change/update title to Update + title of note selected
    titleTag.value=title;                                   //assign new title to dom element input area of title
    desciptionTag.value=description;                        //assign new decrition to dom element text area of description
    //console.log(noteId,title,description);
}

function deleteNote(noteId){                                                //pass note id of note to be deleted
   // console.log(noteId);
   let confirmDel = confirm("Are you sure you want to delete this note?");  //create stroing to hold warning message of deletion
   if(!confirmDel) return;                                                  //if "ok" not clicked from popup dialog do nothing
    notes.splice(noteId,1);                                                 //else remove 1 item from array of data (the one clicked)
    localStorage.setItem("notes",JSON.stringify(notes));                    //update the local storage
    showNotes();                                                            //automatically display dom with remaining element notes
}

addBox.addEventListener("click",()=>{                       //on click of add new note 
    titleTag.focus();                                       //keep cursor on title input area
    popupBox.classList.add("show");                         //open up note 
})

closeIcon.addEventListener("click",()=>{                    //on click of 'x' to close popup dialog add.update note then ...
    isUpdate= false;                                        //dont update any details
    addBtn.innerText = "Add Note";                          //keep note dialog button as "Add note"
    popupTitle.innerText = "Add a new Note";                //note dialog title as "Add a new note"
    titleTag.value="";                                      //set title input area empty
    desciptionTag.value="";                                 //set description text area empty
    popupBox.classList.remove("show");                      //hite menu ellipsis with edit/delete options
})

addBtn.addEventListener("click",e =>{                             //on click of "add new note" button ...
    e.preventDefault;
   // console.log("Button clicked");
   let noteTile = titleTag.value;                                 //create varaible for title and initialize to value the user enters
   let noteDesc = desciptionTag.value;                            //create variable for description and initialize to value the user enters
   
   if(noteTile || noteDesc){                                      //if either of title or description has data
       let dateObj = new Date();                                  //create a date 
       let month = months[dateObj.getMonth()];                    //get the current month index and set to string version from months arrray
       let day = dateObj.getDate();                               //get the current day
       let year = dateObj.getFullYear();                          //get the current year
       let timeH = dateObj.getHours();                            //get the cuurent hour
       let timeM = dateObj.getMinutes();                          //get the current minute

       //console.log("Title: "+ noteTile+" \nDesc: "+noteDesc + "\nDate: "+month,day,year + "\ntime: "+timeH + ":"+timeM);
       //dateFull.innerHTML= day+","+month+","+year+" "+timeH+":"+timeM;
    
       let noteInfo = {                                           //create json db
           title:noteTile,                                        //set the note title from the variable for title
           description:noteDesc,                                  //set the note description from the variable for description
           date:`${day},${month},${year} ${timeH}:${timeM}`       //set the date and time from the variables for year,month,day,hour,minute
       }
       //console.log(noteInfo)
       if(!isUpdate){                                             //if isUpdate is false then...
           notes.push(noteInfo);                                  //add new info to array/object data
       }else{
           isUpdate = false;                                      //else if user is updating data then...
           notes[updatedId] = noteInfo;                           //set update data to selected note index
       }
      // notes.push(noteInfo);
       localStorage.setItem("notes",JSON.stringify(notes));       //set data
       closeIcon.click();                                         //automactically close the popup dialog upon clicking add note
       showNotes();                                               //automatically show note template after clicking add note button
    }

})