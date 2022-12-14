let totalAmount=document.getElementById("total-amount");
let userAmount=document.getElementById("user-amount");
const checkAmountButton=document.getElementById("check-amount");
const totalAmountButton=document.getElementById("total-amount-button");
const productTitle=document.getElementById("product-title");
const errorMessage=document.getElementById("budget-error");
const productTitleError=document.getElementById("product-title-error");
const productCostError=document.getElementById("product-cost-error");
const amount=document.getElementById("amount");
const expenditureValue=document.getElementById("expenditure-value");
const balanceValue=document.getElementById("balance-amount");
const list=document.getElementById("list");
let tempamount=0;

//budget part
totalAmountButton.addEventListener("click",()=>{
    tempamount=totalAmount.value;
    //empty input
    if(tempamount===""||tempamount<0)
    {
        errorMessage.classList.remove("hide");
    }
    else{
        errorMessage.classList.add("hide");
        //set budget
    amount.innerHTML=tempamount;
    //set balance
    balanceValue.innerText=tempamount-expenditureValue.innerText;
    //clear inputbox
    totalAmount.value="";
    }

});

//function to disable  edit and delete button
const disableButton=(bool)=>{
    let editButtons=document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element)=>{
        element.disabled=bool;
    })
};
//function to modify list elements
const modifyElement=(element,edit=false)=>{
    let parentDiv=element.parentElement;
    let currentBalance=balanceValue.innerText;
    let currentExpense=expenditureValue.innerText;
    let parentAmount=parentDiv.querySelector(".amount").innerText;
    if(edit)
    {
        let parentText=parentDiv.querySelector(".product").innerText;
        productTitle.value=parentText;
        userAmount.value=parentAmount;
        disableButton(true);
    }
    balanceValue.innerText=parseInt(currentBalance)+parseInt(parentAmount);
    expenditureValue.innerText=parseInt(currentExpense)-parseInt(parentAmount);
    parentDiv.remove();

};

//function to create list

const listCreator=(expenseName,expenseValue)=>
{
    let sublistContent=document.createElement("div");
    sublistContent.classList.add("sublist-content","flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML=`<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton =document.createElement("button");
    editButton.classList.add("fa-solid","fa-pen-to-square","edit");
    editButton.style.fontSize="24px";
    editButton.addEventListener("click",()=>{
        modifyElement(editButton,true);
    });
    let deleteButton=document.createElement("button");
    deleteButton.classList.add("fa-solid","fa-trash-can","delete");
    deleteButton.style.fontSize="1.2em";
    deleteButton.addEventListener("click",()=>{
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};

//function to add expense
checkAmountButton.addEventListener("click",()=>{
    if(!userAmount.value||!productTitle.value){
        productTitleError.classList.remove("hide");
        return false;
    }
    disableButton(false);
    //expense
    let expenditure=parseInt(userAmount.value);
    //total expense (exisring+new)
    let sum=parseInt(expenditureValue.innerText)+expenditure;
    expenditureValue.innerText=sum;
    //create list
    listCreator(productTitle.value,userAmount.value);
    //empty input
    productTitle.value="";
    userAmount.value="";
});