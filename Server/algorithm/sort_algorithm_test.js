var sorter = require('./sort_alrogirithm');
var Formatter = require('./groups_to_html');
schema = [
    [0, true, 1],
    [1, false, 1],
    [2, true, 1],
    [3, false, 1],
    [4, true, 4],
    [5, false, 10]
];

s1 = {
    'id': 1,
    'responses': [1, 0, 1, 0, 3, 6]
}

s2 = {
    'id': 2,
    'responses': [0, 1, 1, 1, 4, 2]
}

s3 = {
    'id': 1,
    'responses': [1, 1, 0, 0, 1, 4]
}

s4 = {
    'id': 2,
    'responses': [0, 1, 1, 1, 4, 2]
}

s5 = {
    'id': 1,
    'responses': [1, 1, 0, 0, 1, 4]
}

s6 = {
    'id': 1,
    'responses': [1, 1, 0, 0, 1, 4]
}

s7 = {
    'id': 2,
    'responses': [0, 1, 1, 1, 4, 2]
}

s8 = {
    'id': 1,
    'responses': [1, 1, 0, 0, 1, 4]
}


t1 = {
    'id': 1,
    'responses': [1, 0, 0, 1, 4, 1]
}

stud_group = [s1, s2, s3, s4, s5, s6, s7, s8];

var out = sorter.SortGroup(stud_group, 3, schema);
var print = Formatter.generate_html(out);
console.log(print);
console.log("EXITED");

