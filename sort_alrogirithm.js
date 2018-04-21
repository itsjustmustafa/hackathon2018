
function SortGroup(responses, people_per_group) {
    var groups = [][];

    //Create default for group
    for (i = 0; i < people_per_group; i++) {
        groups[i].push(response.pop());
    }

    var modifier = 1;
    while (responses.length > 0) {
        var i = 0;

        var max_index = 0;
        var max_val = 0;
        for (j = 0; j < responses.length; j++) {
            var sum = GetValue_WhenPerson_added_to_Group_Hypothetically(groups[j], responses[j]);
            if (sum > max_val) {
                max_index = j;
                max_val = sum;
            }
        }
        responses[j]
        if (i + 1 === people_per_group) {
            modifier *= -1;
        }
        i += modifier;
        console.log(i);
    }
}

function GetValue_WhenPerson_added_to_Group_Hypothetically(group, response) {
    return 0;
}


