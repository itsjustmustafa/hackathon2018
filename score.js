module.exports = {
    score(group_stats, student, schema) {
        tot_score = 0;
        //schema[n][0] is question n
        //schema[n][1] is is_bal for
        //schema[n][2] is max_val for

        for (let i = 0; i < schema.length; i++) {
            let expected;
            norm_val = student.responses[i] / schema[i][2];
            // //console.log(norm_val);
            if (schema[i][1] == true) {
                if (schema[i][2] == 1) {
                    expected = Math.round(1 - group_stats[i]);
                } else {
                    expected = 1 - group_stats[i];
                }
                tot_score += 1 - Math.abs(expected - norm_val);

            } else if (schema[i][1] == false) {
                if (schema[i][2] == 1) {
                    expected = Math.round(group_stats[i]);
                } else {
                    expected = group_stats[i];
                }
                tot_score += Math.abs(expected - norm_val);
            }
        }
        return (tot_score);
    },
    get_group_stats(student_group, schema) {
        group_stats = [];
        //schema[n][0] is question n
        //schema[n][1] is is_bal for
        //schema[n][2] is max_val for

        for (let i = 0; i < schema.length; i++) {
            group_stats[i] = 0;
            for (let j = 0; j < student_group.length; j++) {
                //console.log(student_group);
                group_stats[i] += student_group[j].responses[i];
            }
            group_stats[i] = group_stats[i] / (student_group.length * schema[i][2]);
        }
        // //console.log("got stats!");
        return (group_stats)
    }
}
/*
schema = [
    [0, true,  1],
    [1, false, 1],
    [2, true,  1],
    [3, false, 1],
    [4, true,  4],
    [5, false,10]
];

s1 = {
    'id': 1,
    'responses':[1, 0, 1, 0, 3, 6]
}

s2 = {
    'id': 2,
    'responses':[0, 1, 1, 1, 4, 2]
}

s3 = {
    'id': 1,
    'responses':[1, 1, 0, 0, 1, 4]
}

t1 = {
    'id': 1,
    'responses':[1, 0, 0, 1, 4, 1]
}

stud_group = [s1, s2, s3];
//console.log(stud_group);
//console.log(t1.responses);
stats = get_group_stats(stud_group, schema)

// //console.log(stats);
// //console.log(score(stats, t1, schema));
*/
//IT WORKS (i think)