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
//    VAREABLES OF SEARCHING
let elFilter = document.querySelector('.filter');
let elSearch = document.getElementById('search');

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
         studentMarkedDate.textContent = element.markedDate;
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
          markedDate: new Date("2021-12-01").toISOString()
     }

     students.push(student);
     renderStudents(students);
     count(students)
}

     let onEdit = (e) => {
          e.preventDefault();

          console.log(e.target)
          // students.forEach(el => {
          //      if(el.id == id){
          //           el.name = elEditName.value;
          //           el.lastName = elEditLastname.value;
          //           el.mark = elEditMark.value;
          //      }
          // })
          // renderStudents(students);
          // count(students);
          // console.log(students)
     }
     
     elEditForm.addEventListener('submit', onEdit);
// }

function beforeDelete(id){
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
          // beforeEdit(evt.target.closest('tr').dataset.id);
     };

     if(evt.target.matches('.student-delete')){
          beforeDelete(evt.target.closest('tr').dataset.id);
     }
}

function onFilter(evt){
     evt.preventDefault();

     let searchValue = elSearch.value.trim();

     if(!searchValue){
          return alert('Input smth to search!');
     }

     let regex = new RegExp(searchValue, 'gi');

     let filteredStudents = [];

     students.forEach((std) => {          

          if(`${std.name} ${std.lastName}`.match(regex)){

               let a = (`${std.name} ${std.lastName}`.match(regex)[0]);

               filteredStudents.push({
                    ...std,
                    name: `${std.name} ${std.lastName}`.replace(regex, `<span class="bg-primary">${a}</span>`),
                    lastName: '',
               });
          }
     });

     renderStudents(filteredStudents);
     count(filteredStudents)
}

elFilter.addEventListener('submit', onFilter)
elTableBody.addEventListener('click', onFix);
elAddForm.addEventListener('submit', addStudent);


renderStudents(students);
count(students)