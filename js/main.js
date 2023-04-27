//    VAREABLES 0F TABLE
let elStudentRow = document.getElementById('student-template').content;
let elTableBody = document.querySelector('.students-table-body');
//    VAREABLES OF ADDING STUDENT
let elAddForm = document.getElementById('add-form');
let elName = document.getElementById('name');
let elLastname = document.getElementById('lastname');
let elMark = document.getElementById('mark');
//    VAREABLES OF EDITING STUDENT
let elEditForm = document.getElementById('edit-form');
let elEditName = document.getElementById('edit-name');
let elEditLastname = document.getElementById('edit-lastname');
let elEditMark = document.getElementById('edit-mark');
//    OTHER VAREABLES
let elCount = document.querySelector(".count");
let elAverageMark = document.querySelector(".average-mark");
//    VAREABLES OF SEARCHING FILTER
let elFilter = document.querySelector('.filter');
let elSearch = document.getElementById('search');
//    VAREABLES OF FILTER BY MARK
let elFrom = document.getElementById('from');
let elTo = document.getElementById('to');
//    VAREABLES OF FILTER BY SORTING
let elSort = document.getElementById('sortby');


Object.prototype.toMakeDate = function () {

     let day = String(this.getDate()).padStart(2, 0);
     let month = String(this.getMonth()+1).padStart(2, 0);
     let year = this.getFullYear();

     return `${day}/${month}/${year}`;
};

let sortFn = {
     az: (a, b) => {
          if(a.name > b.name){
               return 1
          }

          if(a.name < b.name){
               return -1
          }

          return 0
     },
     za: (a, b) => {
          if(a.name > b.name){
               return -1
          }

          if(a.name < b.name){
               return 1
          }

          return 0
     },
     markToLow: (a, b) => b.mark - a.mark,
     markToHigh: (a, b) => a.mark - b.mark,
     date: (a, b) => a.markedDate.getTime() - b.markedDate.getTime(),
}

function count(arr){
     let a = 0;
     elCount.textContent = arr.length;

     arr.forEach(el => {
          a = a + Number(el.mark);
     })

     elAverageMark.textContent = Math.round((a/arr.length)/150 * 100);
}

function renderStudents(arr){
     elTableBody.innerHTML = null;

     arr.forEach(element => {
         let student = elStudentRow.cloneNode(true);
         
         let elStudentRowWrapper = student.querySelector('.studentRowWrapper');
         let studentId = student.querySelector('.student-id');
         let studentName = student.querySelector('.student-name');
         let studentMarkedDate = student.querySelector('.student-marked-date');
         let studentMark = student.querySelector('.student-mark');
         let studentStatus = student.querySelector('.student-pass-status');

         elStudentRowWrapper.dataset.id = element.id;
         studentId.textContent = element.id;
         studentName.innerHTML = `${element.name} ${element.lastName}`;
         studentMarkedDate.textContent = element.markedDate.toMakeDate();
         studentMark.textContent = element.mark;
         
         if(element.mark >= 104){
          studentStatus.textContent = 'Success';
          studentStatus.className = 'text-success';
         }else {
          studentStatus.textContent = 'Fail';
          studentStatus.className = 'text-danger';
     }
         
         elTableBody.append(student);
     });
}

function addStudent(evt){
     evt.preventDefault();

     let student = {
          id: students.length + 100,
          name: elName.value,
          lastName: elLastname.value,
          mark: elMark.value,
          markedDate: new Date()
     }

     students.push(student);
     renderStudents(students);
     count(students)
}

let elEditId = null

let onEdit = (e) => {
     e.preventDefault();

     students.forEach(el => {
          if(el.id == elEditId){
               el.name = elEditName.value;
               el.lastName = elEditLastname.value;
               el.mark = elEditMark.value;
          }
     })
     renderStudents(students);
     count(students);
}

function onDelete(id){
     let delArr = [];
     
     students.forEach(el => {
          if(el.id != id){
               delArr.push(el);
          }
     })
     
     renderStudents(delArr);
     students = delArr;
     count(delArr);
}

function onFix(evt){
     if(evt.target.matches('.student-edit')){
          
          students.forEach(el => {
               if(el.id == evt.target.closest('tr').dataset.id){
                    
                    elEditName.value = el.name;   
                    elEditLastname.value = el.lastName; 
                    elEditMark.value = el.mark; 
               }
          })
          
          elEditId = evt.target.closest('tr').dataset.id
     };

     if(evt.target.matches('.student-delete')){
          onDelete(evt.target.closest('tr').dataset.id);
     }
}

function onFilter(evt){
     evt.preventDefault();
     
     let searchValue = elSearch.value.trim();
     
     let regex = new RegExp(searchValue, 'gi');
     
     let filteredStudents = [];
     
     students.forEach((std) => {  
          
          if(!searchValue){
               return filteredStudents.push(std);
          }
          
          if(`${std.name} ${std.lastName}`.match(regex)){
               
               let a = (`${std.name} ${std.lastName}`.match(regex)[0]);
               
               filteredStudents.push({
                    ...std,
                    name: `${std.name} ${std.lastName}`.replace(regex, `<span class="bg-primary">${a}</span>`),
                    lastName: '',
               });
          }
     });

     if(elFrom.value && elTo.value){

          filteredStudents = filteredStudents.filter(std => std.mark >= Number(elFrom.value) && std.mark <= Number(elTo.value));
     };

     if(elSort.value){
          filteredStudents.sort(sortFn[elSort.value]);
     }
     
     renderStudents(filteredStudents);
     count(filteredStudents)
}

elEditForm.addEventListener('submit', onEdit);
elFilter.addEventListener('submit', onFilter)
elTableBody.addEventListener('click', onFix);
elAddForm.addEventListener('submit', addStudent);


renderStudents(students);
count(students)