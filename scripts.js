function add(...nums) {
    return nums.reduce(((total, num) => (total += num)), 0);
}

function subtract(...nums) {
    return nums.reduce(((total, num) => (total -= num)), 0);
}

function multiply(...nums) {
    if (nums.length == 0) {
        console.log("Please enter at least one number")
    }
    else {
        return nums.reduce(((total, num) => (total *= num)));
    }
}

function divide(...nums) {
    if (nums.length == 0) {
        console.log("Please enter at least one number")
    }
    else {
        return nums.reduce(((total, num) => (total /= num)));
    }
}