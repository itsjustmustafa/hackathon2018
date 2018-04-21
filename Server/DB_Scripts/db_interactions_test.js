var database = require('./db_interaction');

database.getResponseData("generated").then(function (data) {
    // use data
    var break_at = -1;
    var break_set = false;
    var num_to_kill = 2;
    for (var i = 2; i < data.length; i++) {
        if (i == break_at){
            break;
        }
        for (var j = i + 1; j < data.length; j++) {
            if(data[i][0] === data[j][0])
            {
                if (break_set === false)
                {
                    break_at = j;
                    break_set = true;
                }
                data[j].shift();
                data[i].push.apply(data[i],data[j]);
            }
        }
        
        
        num_to_kill += 1;
    }
    data = data.slice(0,num_to_kill - 1);
    console.log("DATA");
}).catch(function (err) {
    throw new err;
});
console.log("DATA");