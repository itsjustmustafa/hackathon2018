function SplitSets(students, exit) {

    while (set)

}

function PartiotionSet(students, min_in_set) {
    var set_1 = [];
    var set_2 = [];

    if (set_1.length > min_in_set && set_2.length > min_in_set) {
        

        students.forEach(student_response => {
            var set_1_sum = set_1.reduce(add_student, { 1: 0, 2: 0 });
            var set_2_sum = set_2.reduce(add_student, { 1: 0, 2: 0 });
            if (student_to_val(set_1_sum) < student_to_val(set_2_sum)) {
                set_1.push(student_response);
            }
            else {
                set_2.push(student_response);
            }
        });
        console.log("DONE");
    }
    return { set_1, set_2 }
}

function add_student(student_a, student_b) {
    var student_sum = student_a;

    student_sum[1] = student_a[1] + student_b[1];
    student_sum[2] = student_a[2] + student_b[2];
    return student_sum;
}

function student_to_val(student) {
    return student[1];
}

var response_1 = {
    1: 0,
    2: 1
}

var response_2 = {
    1: 1,
    2: 0
}
response_3 = {
    1: 1,
    2: 0
}
response_4 = {
    1: 1,
    2: 0
}
response_5 = {
    1: 0,
    2: 0
}
response_6 = {
    1: 1,
    2: 0
}
response_7 = {
    1: 0,
    2: 0
}
response_8 = {
    1: 1,
    2: 0
}
response_9 = {
    1: 0,
    2: 1
}

response_10 = {
    1: 1,
    2: 0
}
response_11 = {
    1: 0,
    2: 1
}

response_12 = {
    1: 1,
    2: 0
}
add_student(response_1, response_2);

all_responses = [
    response_1, response_2, response_3, response_4, response_5,
    response_6, response_7, response_8, response_9, response_10,
    response_11, response_12
];

CreateSets(all_responses);