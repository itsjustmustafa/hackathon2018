
function SortGroup(responses, people_per_group) {
    var groups = new Array();

    //Create default for group
    for (i = 0; i < people_per_group; i++) {
        groups[i] = new Array();
        val = responses.pop()
        groups[i].push(val);
    }

    var modifier = 1;
    var i = 0;
    while (responses.length > 0) {
        var max_index = 0;
        var max_val = 0;
        for (j = 0; j < responses.length; j++) {
            var sum = GetValue_WhenPerson_added_to_Group_Hypothetically(groups[j], responses[j]);
            if (sum > max_val) {
                max_index = j;
                max_val = sum;
            }
        }
        //Get responses[j]
        groups[i].push(responses[max_index]);
        responses.splice(max_index,1); 
        if (i + modifier === people_per_group | i + modifier === -1 ) {
            modifier *= -1;
        }
        i += modifier;
        console.log(i);
    }
}

function GetValue_WhenPerson_added_to_Group_Hypothetically(group, response) {
    return 0;
}

response_1 = 
{
    1: 1
}
response_2 = 
{
    1: 1
}
response_3 = 
{
    1: 0
}
response_4 = 
{
    1: 0
}


response_array_fortesting = new Array();
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);
response_array_fortesting.push(response_1);

SortGroup(response_array_fortesting,4);

