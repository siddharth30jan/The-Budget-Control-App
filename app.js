let expenses=0,income=0,per=0;
//Initializing the DS
let data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    },
    budget: 0,
    percentage: -1
};

var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
};
//Actual mein array ki kopi zrurat nhi padi :V
//Bundle functions
let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
};
let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
};

let ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;
    
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    
    if (itemID) {
        
        //inc-1
        splitID = itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);
        
        let ids, index;
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });//returns an array of id!!

            index = ids.indexOf(ID); //Find the index of the id which we want to delete!

            if(type==='exp')
            {
                expenses-=data.allItems[type][index].value;
            }
            else if(type==='inc')
            {
                income-=data.allItems[type][index].value;
            }
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }//Remove it from ds

            //Deleting from UI
            let el = document.getElementById(itemID);
            el.parentNode.removeChild(el);
            //Updating the budget UI   
let budget=income-expenses;
//Calulating per again!
per=Math.round((expenses /income) * 100);
document.querySelector(DOMstrings.budgetLabel).textContent = budget;
document.querySelector(DOMstrings.incomeLabel).textContent = income;
document.querySelector(DOMstrings.expensesLabel).textContent = expenses;

if (income > 0) {
    document.querySelector(DOMstrings.percentageLabel).textContent = per + '%';
} else {
    document.querySelector(DOMstrings.percentageLabel).textContent = '---';
}       
    }
};


let type,description,value;
let MAINKAM=function(){
    let type=document.querySelector(DOMstrings.inputType).value; // Will be either inc or exp
    let description=document.querySelector(DOMstrings.inputDescription).value;
    let value=parseFloat(document.querySelector(DOMstrings.inputValue).value);
    if (description !== "" && !isNaN(value) && value > 0)
    {
        let ID;
        if (data.allItems[type].length > 0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }
    if (type === 'exp') {
        newItem = new Expense(ID, description, value);
        expenses+=value;
    } else if (type === 'inc') {
        income+=value;
        newItem = new Income(ID, description, value);
    }
    per=Math.round((expenses /income) * 100);
    data.allItems[type].push(newItem);
    //Displaying on UI
    let html, newHtml, element;
    // Create HTML string with placeholder text
    
    if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        
        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage"></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }
    
    // Replace the placeholder text with some actual data
    newHtml = html.replace('%id%', ID);
    newHtml = newHtml.replace('%description%',description);
    newHtml = newHtml.replace('%value%',value);
    
    // Insert the HTML into the DOM
    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    
    //Clearing the fields and focusing back to Description!!
    let fields, fieldsArr;
                
                fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
                
                fieldsArr = Array.prototype.slice.call(fields);
                
                fieldsArr.forEach(function(current, index, array) {
                    current.value = "";
                });
                
                fieldsArr[0].focus();
        
    }
    //Updating the budget UI   
    let budget=income-expenses;         
                document.querySelector(DOMstrings.budgetLabel).textContent = budget;
                document.querySelector(DOMstrings.incomeLabel).textContent = income;
                document.querySelector(DOMstrings.expensesLabel).textContent = expenses;
                
                if (income > 0) {
                    document.querySelector(DOMstrings.percentageLabel).textContent = per + '%';
                } else {
                    document.querySelector(DOMstrings.percentageLabel).textContent = '---';
                }
}
//Blue to Red
let nodeListForEach = function(list, callback) {
    for (let i = 0; i < list.length; i++) {
        callback(list[i], i);
    }
};
let changedType=function(){
    let fields = document.querySelectorAll(
        DOMstrings.inputType + ',' +
        DOMstrings.inputDescription + ',' +
        DOMstrings.inputValue);
    
    nodeListForEach(fields, function(cur) {
       cur.classList.toggle('red-focus'); 
    });
    
    document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
}
//All Event Listners!!
//On Clicking
document.querySelector(DOMstrings.inputBtn).addEventListener('click',MAINKAM);

//On pressing Enter
document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        MAINKAM();
    }
});
//Delete 

document.querySelector(DOMstrings.container).addEventListener('click', ctrlDeleteItem)



//Event for changing colour!
document.querySelector(DOMstrings.inputType).addEventListener('change',changedType);
