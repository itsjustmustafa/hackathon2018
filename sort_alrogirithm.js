
function SortGroup(responses, num_of_groups, schema) {
    var groups = new Array();

    //Create default for group
    for (i = 0; i < num_of_groups; i++) {
        groups[i] = new Array();
        val = responses.pop()
        groups[i].push(val);
    }

    var modifier = 1;
    var i = 0;
    while (responses.length > 0) {

        //Find which student is the best fit
        var max_index = 0;
        var max_val = 0;
        for (j = 0; j < responses.length; j++) {
            var sum = GetValue_WhenPerson_added_to_Group_Hypothetically(groups[i], responses[j],schema);
            if (sum > max_val) {
                max_index = j;
                max_val = sum;
            }
        }

        //Add the response to the group, remove the response from the general pool 
        groups[i].push(responses[max_index]);
        responses.splice(max_index,1); 

        
        //This makes our values cycle, e.g:  0,1,2,3,2,1,0,1,2,3
        if (i + modifier === num_of_groups | i + modifier === -1 ) {
            modifier *= -1;
        } else {
            i += modifier;
        }
        console.log(i);
        
        
    }
    console.log("EXITED");
}

//Mazza makes this
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
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
response_array_fortesting.push(response_3);
SortGroup(response_array_fortesting,4);

