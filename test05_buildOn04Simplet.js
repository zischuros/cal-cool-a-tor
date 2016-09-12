document.getElementsByTagName('body')[0].style.backgroundColor = 'skyblue';
/*
    changes:
    
    1.  In numkeys.forEach(function (k) ... 
        Removed the if/else that provided for a starting OP_STATE of plus ...
        That is already done; so not needed.  Also prevents a '-' selection to start with.

*/
/* 

    this is a simple, single-digit operation to test basics
    TOTAL --- to be the running total
    consider using a Queue structure to handle 
    Foundation will be 'operation state'
    --- because entering + - * / anticipates what will be done with following operand
    
    ------------------------------- build test05 --------------------------------------
    1.  add accumulating digit entry
    2.  use op keys as pivot point
    3.  remember: clear out 'soFarThisEntry' [];
*/
var TOTAL = 0;
var MEMORY = 0;
var ENTRIES = []; // NEED TO KEEP TRACK OF FIRST ENTRY ... BUT ANYTHING ELSE?
var soFarThisEntry = []; // added back in test05
function clearSoFarThisEntry() {
    while (soFarThisEntry.length > 0) {
        soFarThisEntry.shift();
    }
}
var os = {
    add: '+'
    , subtract: '-'
    , multiply: '*'
    , divide: '/'
};
// starting op state is always +
var OP_STATE = os.add;

function setOpState(state) {
    OP_STATE = state;
}
/*
    data storage
    [operator] + [number]
    start with +
    -----------------
    array [{op: +, num: 345}, {op: -, num: 87}];
    going through
    TOTAL =
        case: op = +
        TOTAL += array[0].num
        
    etc.

*/
// calcTotal: arg = object of type {op: '+', num: 9} 
//          : returns -- void --- sets TOTAL
// 
function calcTotal(entry) {
    if (entry['op'] === '+') {
        TOTAL += entry['num'];
    }
    else if (entry['op'] === '-') {
        TOTAL -= entry['num'];
    }
    else if (entry['op'] === '*') {
        TOTAL *= entry['num'];
    }
    else if (entry['op'] === '/') {
        TOTAL /= entry['num'];
    }
    ENTRIES.push(entry);
}
// ---------- operator listeners ---------
function placeValue(nums) {
    var digit = '';
    var num;
    nums.forEach(function (item) {
        digit += item;
    });
    num = Number(digit);
    return num;
}
// ------------ KEY ENTRY: number key operations --------------
numkeys.forEach(function (k) {
    k.addEventListener('click', function (evt) {
        var entered = Number(numkeys.indexOf(k));
        soFarThisEntry.push(entered);
        display.innerHTML = placeValue(soFarThisEntry);
    }, false);
});
/* -------------- enter key -------------------*/
enter.addEventListener('click', function () {
    var entered = placeValue(soFarThisEntry);
    /// test
    console.log(entered);
    /// end test
    var entry = {
        op: OP_STATE
        , num: entered
    };
    calcTotal(entry);
    display.innerHTML = TOTAL;
    MEMORY += TOTAL;
    TOTAL = 0;
    while (ENTRIES.length > 0) {
        ENTRIES.shift();
    }
    clearSoFarThisEntry();
    setOpState(os.add);
}, false);
clear.addEventListener('click', function () {
    while (ENTRIES.length > 0) {
        ENTRIES.shift();
    }
    clearSoFarThisEntry();
    setOpState(os.add);
    TOTAL = 0;
    display.innerHTML = 0;
}, false);
/*
    operators

*/
operators.forEach(function (op) {
    op.operation.addEventListener('click', function (evt) {
        /*
            DO CALCULATION HERE!
            
        
        */
        // testing
        soFarThisEntry.forEach((e) => console.log(e));
        console.log(soFarThisEntry);
        // end testing
        var entered = placeValue(soFarThisEntry);
        /// test
        console.log(entered);
        /// end test
        var entry = {
            op: OP_STATE
            , num: entered
        };
        calcTotal(entry);
        clearSoFarThisEntry();
        /*
            END OF CALC
        
        */
        switch (op.opera) {
        case '+':
            OP_STATE = os.add;
            break;
        case '-':
            OP_STATE = os.subtract;
            break;
        case '*':
            OP_STATE = os.multiply;
            break;
        case '/':
            OP_STATE = os.divide;
            break;
        }
        display.innerHTML = TOTAL + " " + OP_STATE;
    }, false);
});