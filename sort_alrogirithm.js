
function SortGroup(responses, people_per_group) {
    var groups = [][];
    
    //Create default for group
    for (i = 0; i < people_per_group; i++) {
        groups[i].push(response.pop());
    }

    var modifier = 1;
    for (i = 0; i < people_per_group; i + modifier)
    {

        if (i + 1 === people_per_group) {
            modifier *= -1;
        }
    }

}


